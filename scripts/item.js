const createItem=()=>{
    const name = $('#name').val();
    const quantity = $('#quantity').val();
    const price = $('#price').val();

    const tempItem={
        name: name,
        quantity: parseInt(quantity), 
        price: parseFloat(price), 

    };
    console.log(tempItem);

    const database=firebase.firestore();
    database.collection('items').add(tempItem).then((response)=>{
        console.log(response);
        loadItem()
    }).catch((error)=>{
        console.log(error);
    });
}

const loadItem=()=>{
    $('#table-body').empty();
    const database=firebase.firestore();
    database.collection('items').get().then((result)=>{
        result.forEach((records)=>{
            const data=records.data();
            const row=`
            <tr>
                <td>${records.id}</td>
                <td>${data.name}</td>
                <td>${data.quantity}</td>
                <td>${data.price}</td>
                <td>
                    <button class="btn btn-danger btn-sm " onclick="deleteData('${records.id}')">Delete</button>
                    <button class="btn btn-success btn-sm "  onclick="updateItem('${records.id}')">Update</button>
                </td>
            </tr>
            `;
            $('#table-body').append(row);

        })
    })
}
itemId=undefined;

const updateItem=(id)=>{
        itemId=id;
        const database=firebase.firestore();
        database.collection('items').doc(itemId).get().then((response)=>{
            if(response.exists){
                const data=response.data();
                $('#name').val(data.name);
                $('#quantity').val(data.quantity);
                $('#price').val(data.price);
                console.log(response);
            }
        }).catch((error)=>{
            console.log(error);
        });
}

const updateRecord=()=>{
    if(itemId){
        const database=firebase.firestore();
        database.collection('items').doc(itemId).update({
            name:$('#name').val(),
            quantity:$('#quantity').val(),
            price:$('#price').val(),
        }).then(()=>{
            loadItem();
        })
    }
}

const deleteData=(id)=>{
    if(confirm('Are you Sure?')){
        const database=firebase.firestore();
        database.collection('items').doc(id).delete().then(()=>{
            toastr.success('Deleted','success!');
            loadItem();
        })
    }
}
