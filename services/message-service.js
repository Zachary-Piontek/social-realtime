import { getUser } from './auth-service.js';
import { client } from './client.js';

export async function newMessage(input, id) {
    const response = await client
        .from('messages')
        .upsert({
            content: input,
            profile_id: id
        })
        .single();

    return response.data;
}

export async function getMessages() {
    const response = await client
        .from('messages')
        .select(`
        id,
        created_at,
        content,
        user:user-profiles(
           id,
           profile_name 
        )
        `)
        .order('created_at', { ascending: false });
        //.limit(10) in case loading all messages causes a problem
        

    return response.data;
}



export async function getProfile() {
    const user = getUser();

    const response = await client
        .from('user-profiles')
        .select(`*`)
        .eq('user_id', user.id)
        .single();

    return response.data;
}


export async function updateProfile(profile, id) {

    const response = await client
        .from('user-profiles')
        .upsert(profile)
        .eq('id', id)
        .single();

    return response.data;
}

export async function liveUpdate(listener) {
    client
        .from('messages')
        .on('INSERT', async (payload) => {
            const mess = payload.new;
            const user = await getProfile(mess.profile_id);
            mess.user = user;
            listener(mess);
        })
        .subscribe();
}