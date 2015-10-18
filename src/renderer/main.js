import ipc from 'ipc'

if (localStorage.getItem("twitter-credential")){
    console.log(localStorage.getItem("twitter-credential"));
} else {
    ipc.send('need-authentication');
    localStorage.setItem("twitter-credential", 123);
}

localStorage.clear();
