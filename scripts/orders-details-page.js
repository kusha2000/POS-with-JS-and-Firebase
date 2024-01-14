const loadData=()=>{
    const params={};
    //const queryParameters=window.location.search.substring(1);
    // const arr=queryParameters.split("&");
    const queryParameters=new URLSearchParams(window.location.search);
    const id=queryParameters.get('id');
    // console.log(id);

    const database=firebase.firestore();
        database.collection('orders').doc(id).get().then((response)=>{
            if(response.exists){
                const data=response.data();
                console.log(data);

                //=======Order Data

                const orderRow=`
                <tr>
                    <td>${response.id}</td>
                    <td>${data.orderDate}</td>
                    <td>${data.totalCost}</td>
                </tr>
                `
                $('#order-table-body').append(orderRow);

                //=======Customer Data

                const customerRow=`
                <tr>
                    <td>${data.customer.customerId}</td>
                    <td>${data.customer.name}</td>
                    <td>${data.customer.address}</td>
                    <td>${data.customer.salary}</td>
                </tr>
                `
                $('#customer-table-body').append(customerRow);
               
                //=======Item Data

                data.items.forEach(record=>{
                    const itemRow=`
                    <tr>
                        <td>${record.code}</td>
                        <td>${record.description}</td>
                        <td>${record.qty}</td>
                        <td>${record.unitPrice}</td>
                        <td>${record.totalCost}</td>
                    </tr>
                    `
                    $('#item-table-body').append(itemRow);
                });
                print();
            }
        })
}

