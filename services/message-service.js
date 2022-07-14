import { getUser } from './auth-service.js';
import { client } from './client.js';

export async function newMessage(text) {
    const response = await client
        .from('messages')
        .insert({
            text
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
        user:user-profiles (
           id,
           profile_name 
        )
        `)
        .order('created_at', { ascending: false })
        //.limit(10) in case loading all messages causes a problem
        ;

    return response.data;
}


export async function getProfile() {
    const user = getUser();

    const response = await client
        .from('user-profiles')
        .select(`
        id,
        profile_name`)
        .eq('user_id', user.id)
        .single();

    return response.data;
}

export async function updateProfile(profile) {
    console.log(profile);
    const response = await client
        .from('user-profiles')
        .upsert(profile)
        .eq('id', profile.id)
        .single();

    return response.data;
}