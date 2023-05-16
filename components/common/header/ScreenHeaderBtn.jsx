import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'
import { User } from '../../../app/(app)/menu/profile/User';

const ScreenHeaderBtn = ({ dimension, handlePress }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = new User();
    currentUser.getUser().then(() => {
      setUser(currentUser);
    })
  }, []);
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={{ uri: user?.image }}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn