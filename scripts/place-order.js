let orders=[];


const loadIds=()=>{
    loadCustomerIds();
    loadItemIds();
}
 const loadCustomerIds=()=>{
    $('#customer-id').empty();
    
    const database=firebase.firestore();
    database.collection('customers').get().then((records)=>{
        records.forEach((results)=>{
            const option = $('<option></option>').val(results.id).text(results.id);
            //option.value=results.id;
            //option.textContent=results.id;
            $('#customer-id').append(option);
        })
    })
 }
 const loadItemIds=()=>{
    $('#item-id').empty();
    
    const database=firebase.firestore();
    database.collection('items').get().then((records)=>{
        records.forEach((results)=>{
            const option = $('<option></option>').val(results.id).text(results.id);
            //option.value=results.id;
            //option.textContent=results.id;
            $('#item-id').append(option);
        })
    })
 }

 $('#customer-id').on("change",function(){
    const customerId=$(this).val();
    const database=firebase.firestore();
        database.collection('customers').doc(customerId).get().then((response)=>{
            if(response.exists){
                const data=response.data();
                $('#name').val(data.name);
                $('#address').val(data.address);
                $('#salary').val(data.salary);
            }
        })

 })

 $('#item-id').on("change",function(){
    const itemId=$(this).val();
    const database=firebase.firestore();
        database.collection('items').doc(itemId).get().then((response)=>{
            if(response.exists){
                const data=response.data();
                $('#nameItem').val(data.name);
                $('#quantity').val(data.quantity);
                $('#price').val(data.price);
            }
        })

 })

 const addToCart=()=>{
    const unitPrice=Number.parseInt($('#price').val())
    const qty=Number.parseInt($('#quantity').val())
    const totalCost=unitPrice*qty;

    const cartObj={
        "code":$('#item-id').val(),
        "nameItem":$('#nameItem').val(),
        "unitPrice":unitPrice,
        "quantity":qty,
        "totalCost":totalCost

    };

    orders.push(cartObj);

    $('#cart-body').empty();
    orders.forEach(data=>{
        const row=`
            <tr>
                <td>${data.code}</td>
                <td>${data.nameItem}</td>
                <td>${data.unitPrice}</td>
                <td>${data.quantity}</td>
                <td>${data.totalCost}</td>
            </tr>
        `;
        $('#cart-body').append(row);
    });

    calculateCost();
 }

const calculateCost=()=>{
    let total=0;
    orders.forEach(data=>{
        total+=data.totalCost;
    });
    $('#net-Total').val(total);
}

const placeOrder=()=>{

    const customerId=$('#customer-id').val();
    let obj={
        customer:{
            customerId:customerId,
            name:$('#name').val(),
            address:$('#address').val(),
            salary:$('#salary').val()
        },
        orderDate:new Date().toISOString().split(),
        totalCost:Number.parseInt($('#net-Total').val()),
        items:[]
    }


    
        orders.forEach(data=>{
            obj.items.push(data);
        });
        const database=firebase.firestore();
        database.collection('orders').add(obj).then((response)=>{
           
            toastr.success('Saved','success!');
        }).catch((error)=>{
            console.log(error);
        });

}