import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react'
import { ImageIndex } from '../../assets/AssetIndex';
import { useAuthContext } from '../../auth/AuthGuard';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import Internet from '../../InternetCheck/Internet';
import Feather from 'react-native-vector-icons/Feather'

export default function Navbar() {
    const[isConnected , setIsConnected] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    useEffect(() => {
        fetchProfilePicture();
    }, []);

    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get(`https://chawlacomponents.com/api/v1/auth/myprofile`);
            const data = response.data;
            console.log('navbarrrrrrrrrrrr', data.profilePicture);
            if (data.success && data.profilePicture) {
                setProfilePicture(data.profilePicture);
            }
        } catch (error) {
            console.error('Error fetching profile picture:', error);
        }
    };
    const auth = useAuthContext();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        console.log('im clicked ');
    };
    const handleFunc = () => {

        auth.actions.logout()

    }
    console.log('phooot name', auth.authData?.name, auth.authData?.profilePicture)
    return (
        <>
        <View >
            <View style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Image
                        style={styles.logoIcon}
                        resizeMode="cover"
                        source={ImageIndex.logo}
                    />
                    <View style={styles.companyNameWrapper}>
                        <Text style={styles.companyName}>Chawla Ispat</Text>
                    </View>
                </View>
                <View className='flex-col'>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <Text>{auth.authData?.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={toggleModal}>
                            {profilePicture ? (
                                <Image
                                    style={styles.profilePicture}
                                    resizeMode="cover"
                                    source={{ uri: profilePicture }}
                                />
                            ) : (
                                <Image
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                                    }}
                                    style={styles.profilePicture}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='flex-row'>
                  
                    {isConnected==true? <Text style={{fontWeight:'600',marginLeft:'8%'}}>cellular</Text>:<Text style={{fontWeight:'600',marginLeft:'8%'}}>No Net</Text>}
                    {isConnected==true?
                    <Feather
                        color={'blue'}
                        name="wifi"
                        size={18}
                        style={{marginLeft:9}}
                       
                    />:<Feather
                  
                    color={'red'}
                    name="wifi-off"
                    size={18}
                    style={{marginLeft:9}}
                />} 
                </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 30, borderRadius: 10, borderWidth: 0.4, borderColor: 'gray' }}>
                        <TouchableOpacity onPress={handleFunc}>


                            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10 }}>
                                <Text style={{ color: '#283093', fontWeight: '500', fontSize: 18 }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            
        
        </View>
        <Internet isConnected= 
        
        {isConnected} setIsConnected={setIsConnected}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        // backgroundColor: 'yellow',
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    logo: {
        height: 25,
        marginLeft: 2,
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: Dimensions.get('window').height * 0.04,
        height: Dimensions.get('window').height * 0.04,
    },
    companyNameWrapper: {
        paddingHorizontal: Dimensions.get('window').width * 0.02,
    },
    companyName: {
        fontSize: Dimensions.get('window').height * 0.025,
        color: '#283093',
        fontWeight: '500',
    },

    profilePicture: {
        width: Dimensions.get('window').height * 0.04,
        height: Dimensions.get('window').height * 0.04,
        borderRadius: Dimensions.get('window').height * 0.02,
    },
})