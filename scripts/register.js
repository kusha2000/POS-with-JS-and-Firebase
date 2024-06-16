const register=()=>{
    //firebase login

    const email=$('#email').val();
    const password=$('#password').val();

    console.log(email);
    console.log(password);

    if(email && password){
        firebase.auth().createUserWithEmailAndPassword(email,password).then((cred)=>{
            console.log(cred);
            createUser();
            
        }).catch((error)=>{
            console.log(error);
            window.alert(error);
        })
    }else{
        window.alert("Enter Email and Password");
    }

}
const alreadyHaveAnAccount=()=>{
    window.location.replace('login.html');
}


const createUser=()=>{
    const tempUser={
        email:$('#email').val(),
        password:$('#password').val(),

    };
    console.log(tempUser);

    const database=firebase.firestore();
    database.collection('users').add(tempUser).then((response)=>{
        console.log(response);
        window.location.replace('login.html');
    }).catch((error)=>{
        console.log(error);
    });
}