import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import Snackbar from 'react-native-snackbar';
import { RNHoleView } from 'react-native-hole-view';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const QrScanner = ({ navigation }: any) => {
    const cameraRef = useRef(null);
    const [scannedData, setScannedData] = useState('');
    console.log("scannedData", scannedData)
    const handleBarcodeScanned = async (event: any) => {
        if (event.data) {
            setScannedData(event.data);
        }
        let data = event.data;
        console.log("dataaaa", data);
        // let id = data.employee._id;
        // console.log("iddddddddd", id)
        try {
            console.log('ammmmm')
            let res = await axios.post(`https://chawlacomponents.com/api/v2/attendance/find-employee-by-Qr`, { data });
            // let res = await axios.post(`https://chawlacomponents.com/api/v2/attendance/find-employee-by-Qr`, { resdata })
            let resData = await res
            console.log("resdaata", resData)
            console.log("iddddddddd", resData.data.employee._id)
            let pic = resData?.data?.docs?.profilePicture
            let punch = resData?.data?.punch
            let empData = resData?.data?.employee
            let id = resData?.data?.employee._id
            console.log('punnchhhhh', punch)
            const singleData = await axios.get(`https://chawlacomponents.com/api/v2/attendance/singleEmployee/${id}`);

            Snackbar.show({
                text: 'QR Scanned Successfully',
                backgroundColor: 'green',
                duration: 2000,
            });
            let statusfromapi
            if (singleData.data && singleData.data.data && singleData.data.data.length > 0) {

                const data = singleData.data.data[0];
                const date = data.date;

                console.log('dataaaaaaaaaa', data)
                console.log('date', date)
                statusfromapi = data.status;





            }
            if (statusfromapi == "approved") {
                Snackbar.show({
                    text: 'Already Approved',
                    backgroundColor: 'green',
                    duration: 2000,
                });
                navigation.navigate('DashBoard')

            }

            else if (punch == 'Punch In') {
                // Alert.alert('Need to First Punch-In')
                Snackbar.show({
                    text: 'Need to First Punch-In',
                    backgroundColor: '#FFC72C',
                    duration: 2000,
                });
                navigation.navigate('DashBoard')
            }
            else {
                navigation.navigate('EmployeeDetail', { pic, punch, empData })
            }

        }
        catch (error) {
            console.log("error while scanning barcode", error)

        
            Snackbar.show({
                text: 'Error while scanning barcode',
                backgroundColor: '#FFC72C',
                duration: 2000,
            });
            navigation.navigate('DashBoard')
        }
    };
    const openCamera = () => {
        setScannedData('');
    };

    const startScan = async () => {
        if (cameraRef.current) {
            try {
                const options = {
                    quality: 0.6,
                    base64: true,
                    // pauseAfterCapture: true,
                };
                setScannedData('')
                // const data = await cameraRef.current.takePictureAsync(options);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
        // setScannedData('')
    };

    return (
        <View style={styles.container}>
            {!scannedData ? (
                <RNCamera
                    style={styles.camera}
                    onBarCodeRead={handleBarcodeScanned}
                    captureAudio={false}
                    ref={cameraRef}
                >
                    
                    <RNHoleView
                        holes={[
                            {
                                x: widthPercentageToDP('10.5%'),
                                y: heightPercentageToDP('25%'),
                                width: widthPercentageToDP('80%'),
                                height: heightPercentageToDP('30%'),
                                borderRadius: 10,
                            },
                        ]}
                        style={styles.rnholeView}
                    />
                </RNCamera>
            ) : (
                // <View style={styles.scannedDataContainer}>
                //     <Text style={styles.scannedDataText}> Scanned Data: {scannedData}</Text>
                //     <Button color={'#283093'} title="Scan Again" onPress={openCamera} />
                // </View>
                // navigation.navigate('EmployeeDetail', { pic, punch, empData })
                null
            )}
            {!scannedData &&
                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={openCamera}
                >
                    <Text style={{ color: 'white' }}>Scan QR Code</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

export default QrScanner;

const overlayBackgroundColor = 'rgba(0, 0, 0, 0)';

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: overlayBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    centerBox: {
        width: 250,
        height: 250,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',

        justifyContent: 'center',
    },
    transparentBackground: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'yellow',
    },
    scanButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        backgroundColor: '#283093',
        padding: 20,
        borderRadius: 10,
    },
    // scannedDataContainer: {
    //     position: 'absolute',
    //     top: 20,
    //     left: 20,
    //     right: 20,
    //     backgroundColor: 'white',
    //     padding: 10,
    //     borderRadius: 10,
    // },
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    scannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerBorder: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: 'white',
        position: 'relative',
    },
    scannerCorner: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: '#4CAF50',
        position: 'absolute',
    },
    topLeftCorner: {
        top: -1,
        left: -1,
        borderTopLeftRadius: 8,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    topRightCorner: {
        top: -1,
        right: -1,
        borderTopRightRadius: 8,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    bottomLeftCorner: {
        bottom: -1,
        left: -1,
        borderBottomLeftRadius: 8,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    bottomRightCorner: {
        bottom: -1,
        right: -1,
        borderBottomRightRadius: 8,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    scannedDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannedDataText: {
        fontSize: 20,
        marginTop: 16,
        textAlign: 'center',
        color: 'black',
        margin: 10
    },
    rnholeView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});