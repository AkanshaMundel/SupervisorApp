import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Modal, Image, RefreshControl, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import { ImageIndex } from '../../assets/AssetIndex'


const ApprovalLogs = () => {
    const [data, setData] = useState([]);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleOpenButtonPress = (imageUrl: any) => {
        console.log('im from here img', imageUrl);
        setSelectedImageUrl(imageUrl);
        setIsModalVisible(!isModalVisible);
    };


    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNoData();
        setRefreshing(false);
    };
    const fetchNoData = async () => {
        const currentDate = new Date();


        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        try {
            const response = await axios.get(`https://chawlacomponents.com/api/v2/attendance/ownApproved?date=${formattedDate}`);
            const data = response.data.data;
            console.log('datale', data)
            setData(data);



        }
        catch (err) {
            console.error('Error fetching data:', err);
        }
    }
    useEffect(() => {
  fetchNoData();

    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navbar />
            <View style={{ padding: 15, flex: 1, marginBottom: 10 }}>
                <View style={{ margin: 15 }}>
                    <Text style={{ fontSize: 20, color: '#2E2E2E', fontWeight: '700' }}>ApprovalLogs</Text>

                </View>

                <ScrollView horizontal={true}
                  
                   
                    >
                    {/* header */}
                    <View>
                        <View style={styles.tableHeader}>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#2E2E2E',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Date
                                </Text>
                            </View>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#2E2E2E',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Name
                                </Text>
                            </View>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#2E2E2E',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Approve Time
                                </Text>
                            </View>
                            <View style={styles.tableDataH}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#2E2E2E',
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                    Photo
                                </Text>
                            </View>
                        </View>

                        {/* body */}
                        <FlatList
                            data={data}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }



                            renderItem={({ item: v, index }) => (

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1 }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                }}>
                                                {v.date ? v.date.split('T')[0] : ''}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1 }}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                }}>
                                                {v.employeeId.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1, flexBasis: '100%' }}>

                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontFamily: 'Inter-Medium',
                                                }}>
                                                {v.approvedTime ? v.approvedTime.slice(11, 16) : ''}
                                            </Text>

                                        </View>
                                    </View>
                                    <View style={styles.tableData}>
                                        <View style={{ flexShrink: 1, flexBasis: '100%' }}>
                                            <TouchableOpacity onPress={() => handleOpenButtonPress(v.approvedImage)}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text
                                                        style={{
                                                            color: 'black',
                                                            fontFamily: 'Inter-Medium',
                                                        }}>
                                                        Open
                                                    </Text>
                                                    <Image style={{ width: 15, height: 15, marginLeft: 4 }} source={ImageIndex.arrowout} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            )}

                        />
                    </View>
                    {selectedImageUrl && (
                        <Modal
                            visible={isModalVisible}
                            animationType="fade"
                            transparent={true}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setIsModalVisible(false)}
                                    >
                                        <Image style={{ width: 20, height: 25, marginTop: 3 }} source={ImageIndex.cross} />
                                        {/* <Icon name="close" size={20} color="black" /> */}
                                    </TouchableOpacity>
                                    <Image
                                        source={{ uri: selectedImageUrl }}
                                        style={styles.modalImage}
                                        resizeMode="contain"
                                    />
                                    {/* <Text style={styles.closeText}>Close</Text> */}
                                </View>
                            </View>
                        </Modal>
                    )}
                </ScrollView>
            </View>

        </View>
    )
}

export default ApprovalLogs

const styles = StyleSheet.create({
    tableHeader: {
        backgroundColor: '#ECEDFE',
        flexDirection: 'row',
        borderRadius: 8
    },
    tableData: {
        paddingVertical: 7,
        paddingLeft: 20,
        width: 160,
        // width:80
    },
    tableDataH: {
        paddingVertical: 16,
        paddingLeft: 24,
        width: 160,
        // width:50
    },
    outerView: {
        padding: '6%', borderWidth: 1, borderRadius: 10, marginLeft: '4%',
        marginRight: '4%', borderColor: '#0000001F', height: '76%',
    }, container: {
        // width: '50%',
        // height: '20%',
        backgroundColor: '#fafafa',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: '90%',
        height: undefined,
        aspectRatio: 1, // To maintain a square format
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15,
        color: 'white',
    },
    closeText: {
        marginTop: 10,
        fontSize: 18,
        color: 'black',
    },

})