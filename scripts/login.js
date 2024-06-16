const login=()=>{
    //firebase login

    const email=$('#email').val();
    const password=$('#password').val();

    firebase.auth().signInWithEmailAndPassword(email,password).then((resp)=>{
        console.log(resp);
        window.location.replace('dashboard.html');
    }).catch((error)=>{
        console.log(error);
    })
}
const createAnAccount=()=>{
    window.location.replace('register.html');
}
