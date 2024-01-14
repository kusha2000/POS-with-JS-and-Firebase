const loadData=()=>{
    $('#orders-table-body').empty();
    const database=firebase.firestore();
    database.collection('orders').get().then((result)=>{
        result.forEach((records)=>{
            const data=records.data();
            const row=`
            <tr>
                <td>${records.id}</td>
                <td>${data.customer.name}</td>
                <td>${data.orderDate}</td>
                <td>${data.totalCost}</td>
                <td>
                    <button class="btn btn-dark btn-sm " onclick="printData('${records.id}')">Print</button>
                </td>
            </tr>
            `;
            $('#orders-table-body').append(row);

        })
    })
}

const printData=(id)=>{
    window.open(`orders-details-page.html?id=${id}`,"_blank");
}