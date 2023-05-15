import { View, Text, TouchableOpacity } from 'react-native';

import styles from "./Mesengers.style";
import ScreenHeaderBtn from '../../header/ScreenHeaderBtn';

const Mesengers = ({groupChat, handleNavigate}) => {
  console.log(groupChat.name)
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      
      <TouchableOpacity style={styles.logoContainer}>
          <ScreenHeaderBtn iconUrl={groupChat.image} dimension="100%"/>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
        {groupChat.name}
        </Text>
        <Text style={styles.jobType}>{groupChat.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Mesengers