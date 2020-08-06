# libMIDI - API Description
## A 100% JavaScript MIDI Player using W3C Web Audio

-----






### Find out about the audio mode

After the script has been loaded, you determine the audio method that will be used by libMIDI. A call to libMIDI.get_audio_status() will return a descriptive string.

> libMIDI.get_audio_status()

Possible answers are "WebAudioAPI" in case the W3C Web Audio API is supported, \<bgsound\> for Microsoft Internet Explorer or \<object\> for all other browsers that do not support the W3C Web Audio API.

\<bgsound\> uses the Internet Explorer's internal MIDI player. 

\<object\> looks for a plugin that can play MIDI files. If no such plugin is installed, the user will be prompted by his browser. Note: Apple's Quick Time plugin used to be a fairly good MIDI player. However, latest versions of it dropped the MIDI playback via object tag for unkown reasons.

-----
### Get status and error messages

If you supply a callback you will get info and error messages about the player's status as soon as you start playing.

Define a function to handle status messages

> function display_message(mes) {
>      my_message_div.innerHTML = mes;
> };

Set the function as message callback

> libMIDI.message_callback = display_message;

*Note: This callback will only fire if the W3C Web Audio API is supported.*

-----

### Start playback

Calling play(url) will download the MIDI file from url, load the instruments used by this MIDI file and start playback.

>  libMIDI.play(url)


-----
### Cancel playback

Calling stop() will cancel the current playback.

>  libMIDI.stop()

-----

### Pause playback (Only works in browsers supporting WebAudio API. It doesn't have any effect in Microsoft's Internet Explorer.)

Calling pause() pauses playback. Playback may be resumed later on.

>  libMIDI.pause()

-----

### Resume playback (Only works in browsers supporting WebAudio API. It doesn't have any effect in Microsoft's Internet Explorer.)

Calling resume() will continue with playing a formerly paused playback.

>  libMIDI.resume()

-----

### Get duration of MIDI file (Does not work in Microsoft's Internet Explorer version 9 and below.)

Calling get_duration(url, callback) will report the total playing time of url via the callback. For unsupported browsers (Microsofts's Internet Explorer version 9 and below) the callback will return -1.

> libMIDI.get_duration(url, callback)

Example for logging duration to browser's console:

> libMIDI.get_duration("url", function(seconds) { console.log("Duration: " + seconds);} )

-----

### Get player events

If you supply a callback you will receive permanently events during ongoing playbacks. Currently there is only the time in seconds available the current file has been playing.

Define a function to handle player event:

> function display_time(ev) {
>      my_time_div.innerHTML = ev.time; // time in seconds, since start of playback
> };

Set the function as player callback:

> libMIDI.player_callback = display_mesage;

The callback may be called every 100 ms. So be careful not to do any computationally heavy stuff in this callback. This will lead to quite some jitter.


-----
### FAQ

    Q: Can I play multiple MIDI files at the same time?
    A: No. When calling libMIDI.play(url) any current playback is being stopped.
    Q: Can I play a MIDI file automatically after loading the page?
    A: Yes, except for iOS devices and Chrome since version 71. Believe it or not: The Web Audio API on these browsers will only start playing if called from within a user generated event. Loading the page does not count as such. Clicking a button or touching a link does. Test your browser with this Autoplay Demo.
    Q: Can I use libMIDI on HTTPS pages?
    A: Yes, you can. However, Microsofts's Internet Explorer will produce a "Mixed secure/insecure content" warning, which has be acknowledged. Furthermore on HTTPS pages Internet Explorer will only play MIDI files that have been downloaded with HTTP (not HTTPS). Hm ...
    Q: Using libMIDI produces messages on the JavaScript console of my browser. Do they indicate a problem ?
    A: No, the following two messages do not indicate a problem of any kind. You can safely ignore them.
        1. pre-main prep time: x ms
        2. The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page
