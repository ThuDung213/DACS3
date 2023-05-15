
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Postcart from "../../../../components/common/cards/posts/Postcard"

const Forum = (props) => {
  const navigation = useNavigation();
  
  const [isLoading, setisLoading] = useState(true);
    const [post, setPost] = useState([]);
    // viết hàm load sp
    let url_api = 'http://192.168.1.8:3000/posts';
    const getListPost = async () => {

        try {
            const response = await fetch(url_api); // load dữ liệu

            const json = await response.json(); // chuyển dữ liệu thành json

            setPost(json);// đổ dữ liệu vào state

        } catch (error) {
            console.error(error);
        } finally {
            // kết thúc quá trình load dữ liệu, kể cả có lỗi cũng gọi vào lệnh này
            setisLoading(false); // trạng thái không còn load nữa
        }
    }

    

    const renderProduct = ({ item }) => {

        const xoaSP = () => {
            // link xóa
            let url_api_del = `http://192.168.1.8:3000/posts/${item.id}`;
    
            fetch(url_api_del, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    if (res.status == 200){
                        alert("Đã xóa");
                        getListPost();
                    }
    
                })
                .catch((ex) => {
                    console.log(ex);
                });
    
        }
        return (
            <Postcart post={item} handleActivity={xoaSP} />
        );
    }


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getListPost();
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View >
            <Button title="Thêm SP"
                onPress={() => { navigation.navigate('addPost') }} />

            {
                (isLoading) ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList data={post}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={renderProduct} />
                )
            }

        </View>

    );
}

export default Forum;

