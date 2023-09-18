import { Image, StyleSheet, Text, View, TouchableOpacity, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { ImageIndex } from '../../assets/AssetIndex'
import { responsiveHeight } from 'react-native-responsive-dimensions';
import axios from 'axios'
import Internet from '../../InternetCheck/Internet';


const DashBoard = ({ navigation }: any) => {

    const handleLoginPress = () => {
        console.log('scannn')
        navigation.navigate('QrScanner')

    };
    const [shopName, setShopName] = useState('');
    const [len, setlen] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    // const[isConnected , setIsConnected] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        await fetchNoData();
        setRefreshing(false);
    };

    const fetchData = async () => {
        try {
            console.log('cccccccccccccccccc')
            const response = await axios.get('https://chawlacomponents.com/api/v1/auth/myprofile');
            const data = response.data;
            console.log('ans', data)
            let fetchedJobProfileName: any;

            if (response.data && response.data.employee) {
                fetchedJobProfileName = response.data.employee.jobProfileId.jobProfileName;
                console.log('profilename', fetchedJobProfileName)

            } else {
                console.error('Invalid API response structure');
            }



            const shopApi = await axios.get(`https://chawlacomponents.com/api/v1/shop`);
            if (shopApi.data && shopApi.data.success && shopApi.data.shops) {
                const shops = shopApi.data.shops;

                console.log('shopppp', shops)

                const matchingShop = shops.find((shop: any) => shop.jobProfile.jobProfileName === fetchedJobProfileName);

                if (matchingShop) {
                    setShopName(matchingShop.shopName);
                    console.log('Matching Shop Name:', shopName);
                } else {
                    console.error('No matching shop found for the job profile name.');
                }
            } else {
                console.error('Invalid API response structure for the second API');
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchNoData = async () => {
        const currentDate = new Date();


        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        try {
            const response = await axios.get(`https://chawlacomponents.com/api/v2/attendance/ownApproved?date=${formattedDate}`);
            const datalen = response.data.total;
            console.log('datale', datalen)
            setlen(datalen);


        }
        catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         console.log('cccccccccccccccccc')
        //         const response = await axios.get('https://chawlacomponents.com/api/v1/auth/myprofile');
        //         const data = response.data;
        //         console.log('ans', data)
        //         let fetchedJobProfileName: any;

        //         if (response.data && response.data.employee) {
        //             fetchedJobProfileName = response.data.employee.jobProfileId.jobProfileName;
        //             console.log('profilename', fetchedJobProfileName)

        //         } else {
        //             console.error('Invalid API response structure');
        //         }



        //         const shopApi = await axios.get(`https://chawlacomponents.com/api/v1/shop`);
        //         if (shopApi.data && shopApi.data.success && shopApi.data.shops) {
        //             const shops = shopApi.data.shops;

        //             console.log('shopppp', shops)

        //             const matchingShop = shops.find((shop: any) => shop.jobProfile.jobProfileName === fetchedJobProfileName);

        //             if (matchingShop) {
        //                 setShopName(matchingShop.shopName);
        //                 console.log('Matching Shop Name:', shopName);
        //             } else {
        //                 console.error('No matching shop found for the job profile name.');
        //             }
        //         } else {
        //             console.error('Invalid API response structure for the second API');
        //         }


        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // }
        // async function fetchNoData() {
        //     try {
        //         const response = await axios.get('https://chawlacomponents.com/api/v2/attendance/ownApproved');
        //         const datalen = response.data.data.length;
        //         console.log('datale', datalen)
        //         setlen(datalen);


        //     }
        //     catch (err) {
        //         console.error('Error fetching data:', err);
        //     }
        // }

        fetchData();
        fetchNoData();

    }, [shopName, len]);

    return (

   


<View style={{ backgroundColor: 'white', flex: 1 }}>
            <Navbar />
            <ScrollView
                style={{ backgroundColor: 'white' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >


                <View style={{ padding: '5%', marginBottom: '20%', maxHeight: '90%' }} >

                    <View style={{ flexDirection: 'column' }}>

                        {shopName ? (
                            <Text style={{ color: '#949494', fontWeight: '500', fontSize: 17 }}>{shopName}</Text>
                        ) : <Text style={{ color: '#949494', fontWeight: '500', fontSize: 17 }}>
                            NoShop</Text>}
                        <Text style={{ color: '#2E2E2E', fontSize: 20, fontWeight: '700' }}>Today Staff Check-In</Text>
                        <View style={{ width: '69%', height: '48%', borderRadius: 6, borderWidth: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#DEDEDE' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                {len ? (<Text style={{ fontSize: 25, fontWeight: '600', color: '#283093', }}>{len}</Text>) : <Text style={{ fontSize: 25, fontWeight: '600', color: '#283093', }}>0</Text>}

                                <Image style={{ width: 19, height: 19 }} source={ImageIndex.arrowup} />

                            </View>
                            {shopName ? (
                                <Text style={{ color: 'black' }} >Under {shopName}</Text>
                            ) : <Text style={{ color: 'black' }} >Under noshop</Text>}

                        </View>


                    </View>

                    <View
                        style={{
                            borderBottomColor: '#DEDEDE',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginTop: responsiveHeight(4),
                            marginBottom: '10%'
                        }}
                    />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 6, backgroundColor: '#ECEDFE', width: '100%', height: '19%', padding: '3%' }} onPress={() => { navigation.navigate('ApprovalLogs') }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}  >
                            <Text style={{ color: '#283093', fontWeight: '500', marginLeft: '5%', fontSize: 17 }}>
                                View Approval Logs
                            </Text>
                            <Image style={{ width: 19, height: 19, marginLeft: '40%' }} source={ImageIndex.squarearrow} />
                        </View>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        
            {/* <Internet isConnected= 
        
        {isConnected} setIsConnected={setIsConnected}/> */}
            <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginPress()}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 19, height: 19 }} source={ImageIndex.scan} />
                    <Text style={styles.buttonText}>Scan QR</Text>
                </View>
            </TouchableOpacity>


        </View> 
        
       


    )
}

export default DashBoard

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#283093',
        justifyContent: 'center',
        alignItems: 'center',
        height: '7%',
        borderRadius: 14,
        marginTop: '185%',
        width: '35%',
        position: 'absolute',
        marginLeft: '60%',
        marginRight: '5%'
    },
    buttonText: {
        color: 'white',
        paddingLeft: 10,
    },
})