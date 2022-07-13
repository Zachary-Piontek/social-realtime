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


export async function getProfile(id) {
    const response = await client
        .from('user-profiles')
        .select(`
        id,
        profile_name`)
        .eq('id', id)
        .single();

    return response.data;
}

export async function updateProfile(profile) {
    const response = await client
        .from('user-profiles')
        .upsert(profile);

    return response.data;
}