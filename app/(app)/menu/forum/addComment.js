import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { auth } from '../../../../config/firebase';

const AddComment = () => {
    const [comment, setComment] = useState('');

    const SaveComment = () => {
        // tạo đối tượng dữ liệu
        let objSP = { comment: comment, userEmail: auth?.currentUser?.email };
        let url_api = 'http://192.168.1.11:3000/comments';

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
                    alert("comment Successfully")
            })
            .catch((ex) => {
                console.log(ex);
            });

    }


    return (
        <View>
            <Text>Comment </Text>
            <TextInput placeholder="Comment"
                onChangeText={(txt) => { setComment(txt) }}
            />
            <Button title="Save" onPress={SaveComment} />



        </View>

    );
}
export default AddComment;