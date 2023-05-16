import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import {auth} from '../../../../config/firebase';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [desc, setdesc] = useState('');

    const SaveProduct = () => {
        // tạo đối tượng dữ liệu
        let objSP = { title: title, desc: desc, userEmail: auth?.currentUser?.email };
        let url_api = 'http://192.168.1.8:3000/posts';

        fetch(url_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP)
        })
            .then((res) => {
                if (res.status == 201)
                    alert("Thêm thành công")
            })
            .catch((ex) => {
                console.log(ex);
            });

    }

    const editPost = () => {

    }


    return (
        <View>
            <Text>Create Post </Text>
            <TextInput placeholder="Your status"
                onChangeText={(txt) => { setTitle(txt) }} />
            <TextInput placeholder="Description"
                onChangeText={(txt) => { setdesc(txt) }}
            />
            <Button title="Save" onPress={SaveProduct} />



        </View>

    );
}
export default AddProduct;