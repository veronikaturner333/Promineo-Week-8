// Track class Creates track, holds name of track and artist
class Track {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;
    }
    //use template literal to display user created name and artist
    describe() {
        return `${this.name} by ${this.artist}.`;  
    }
}

//Playlist class creates playlist, holds array of tracks
class Playlist {
    constructor(name) {
        this.name = name;
        this.tracks = []; //Start with empty tracks array
    }

    //addTrack method takes track
    addTrack(track) {
        //check to see if track is instance of Track class so user can't just pass in anything
        if (track instanceof Track) {
            //add new track if so
            this.tracks.push(track);
        } else {
            //if not, provide an error message to tell the user what they did wrong
            throw new Error(`You can only add an instance of track. 
            Argument is not a track: ${track}`);
        }
    }
    describe() {
            //use template literal to display user created playlist name and the amount of tracks
            return `${this.name} has ${this.tracks.length} tracks.`;
        }
}

// what drives the application and available user choices
class Menu {
    constructor() {
        this.playlists = [];
        // When we start, no playlists are selected yet. Manage one playlist at a time
        this.selectedPlaylist= null;
    }

    // method to start up the application, entry point to application
    start() {
        //create variable of what option user has selected
        let selection = this.showMainMenuOptions();
        //The user selection is then returned.
        //while user has not exited (by choosing 0, determine what they selected and what to do then)
        while (selection != 0) {
        switch(selection) {
        case '1' :
            this.createPlaylist(); //if they selected 1, create a playlist
            break;
        case '2' :
            this.viewPlaylist(); //if they select 2, then view a specific playlist
            break;
        case '3' :
            this.deletePlaylist(); //if they select 3, delete a specific playlist
            break;
        case '4' :
            this.displayPlaylists(); //if they select 4, display all playlists
            break;
        default:
            selection = 0; //if anything else selected, default to 0 and exit
        }
        //we want to get the selection again while still inside loop
        //so it keeps showing up as long as we haven't selected 0 or a number outside of 1-4
        selection = this.showMainMenuOptions();
        }
        //If user does select zero, we alert goodbye
        alert('Goodbye!');
    }

    //return popup box that asks user for input. Then return input from prompt
    //Each menu item will show up like this on a new line
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create a new playlist
        2) view a playlist
        3) delete a playlist
        4) display all playlists
        `);
    }

    //options displayed when user views a playlist
    showPlaylistMenuOptions(playlistInfo) {
        //return prompt and then display user input passed in
        return prompt(`
            0) back
            1) add a new track
            2) delete a track
            -----------------
            ${playlistInfo}
        `);
    }

    //displayPlaylist method
    displayPlaylists() {
        //start with empty string
        let playlistString = '';
        //playlists is our list of all playlists that exist
        //we iterate through the playlists and concatenate
        for (let i = 0; i < this.playlists.length; i++) {
            //Grab each playlist and its name, then add a new line.
            //All playlist names will show up along with index numbering them
            playlistString += i+ ') ' + this.playlists[i].name + '\n';
        }
        //once we are out of the for loop we display all the playlists
        alert(playlistString);
    }

    //createPlaylist method
    createPlaylist() {
        //prompt user for a name to give to the playlist they are making
        let name = prompt('Enter name for new playlist: ');
        //passing in new name we created and pushing it to the array of playlists
        this.playlists.push(new Playlist(name));
    }

    //viewPlaylist method to view details of specific playlist
    viewPlaylist() {
        //ask user index of playlist they want to view
        let index = prompt("Enter the index of the playlist you want to view:");
        //User input validation to avoid errors
        //As long as index is greater than -1 and less than the length of playlist array, we do something
        if (index > -1 && index < this.playlists.length) {
            //set class property to playlist selected by user
            this.selectedPlaylist = this.playlists[index];
            //display playlist name(s)
            let description = 'Playlist Name: ' + this.selectedPlaylist.name + '\n';
            //Iterate through and print name and artist of each track
            //until you get through length of tracks array
            for (let i = 0; i < this.selectedPlaylist.tracks.length; i++) {
                description += i + ') ' + this.selectedPlaylist.tracks[i].name + ' - ' + this.selectedPlaylist.tracks[i].artist + '\n';
            }

            //pass in description we just built
            //Implement showPlaylistMenuOptions method to show menu options for playlist
            let selection1 = this.showPlaylistMenuOptions(description);
            switch (selection1) {
            case '1' :
                this.createTrack(); //if they selected 1, create track
                break;
            case '2' :
                this.deleteTrack(); //if they selected 2, delete track
            }
        }
    }
                             
    //deletePlaylist method to delete a specific playlist
    deletePlaylist() {
        //prompt user to enter index of playlist they want to delete
        let index = prompt("Enter the index of the playlist you want to delete:");
        //validate user input
        if(index > -1 && index < this.playlists.length){
            //Goes to index user chose and removes that item
            this.playlists.splice(index,1);
        }
    }

    //createTrack method to create a track
    createTrack() {
        //prompt user to enter name and artist of the new track and push new track along w/ info
        let name = prompt("Enter the name for new track");
        let artist = prompt("Enter artist for new track");
        this.selectedPlaylist.tracks.push(new Track(name, artist));
    }

    //deleteTrack method to delete a track
    deleteTrack() {
        //once again validating user input
        let index = prompt("Enter the index of the track you want to delete");
        if(index > -1 && index < this.selectedPlaylist.tracks.length) {
            //Goes to index user chose and removes that item
            this.selectedPlaylist.tracks.splice(index,1);
        }
    }
}

//create instance of new menu, start program
let menu = new Menu();
//method that shows everything
menu.start();