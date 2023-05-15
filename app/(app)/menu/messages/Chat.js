import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text } from 'react-native';
  import { GiftedChat,InputToolbar, Send } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { signOut } from 'firebase/auth';
  import {auth,database} from '../../../../config/firebase'
  import { useNavigation, useRoute } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import { COLORS } from '../../../../constants/constants/theme';
import { View } from 'react-native-web';


  export default function Chat() {

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();

  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <AntDesign name="logout" size={24} color={COLORS.gray} style={{marginRight: 10}}/>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text>{route.params.name}</Text>
          )
        });
      }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(database, `group${route.params.name}`);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
      }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(database,`group${route.params.name}`), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);
    
      const inputStyle = {
         marginLeft: 15,
        marginRight: 15,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 25
      };
      return (
          <GiftedChat
          messages={messages}
          renderSend={(props) =>{
            return (
              <Send {...props}  containerStyle={{ borderWidth: 0, justifyContent:'center', marginRight:20}}>
                  <FontAwesome name="send" size={24} color="black" />
              </Send>
            );
          }}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          // alwaysShowSend={true}
          renderInputToolbar={props => (
            <InputToolbar
            {...props}
              containerStyle={inputStyle}
              placeholder="Aa"      
            />
          )}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      );
}

