// handleSavePlaylist.js

const handleSavePlaylist = async (playlistId, userId, playlistName) => {
    try {
        // Assuming you are passing the userId along with the playlistId
        const response = await fetch('http://localhost:4000/api/firebase/savePlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                playlistId: playlistId, 
                userId: userId, 
                playlistName: playlistName,}),
        });

        if (!response.ok) {
            throw new Error('Error saving playlist');
        }
        return 'Playlist saved successfully';
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

export default handleSavePlaylist;
