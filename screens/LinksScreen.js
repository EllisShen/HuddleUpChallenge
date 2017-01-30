import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    Platform,
    ActivityIndicator,
} from 'react-native';

export default class LinksScreen extends React.Component {
    constructor() {
        super();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoading: false,
        };

        this._data = [];
        this._dataLength = 0;
        this._dataLowerIndex = 0;
        this._dataUpperIndex = 50;
        this._fetchFoodList = this._fetchFoodList.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }

    componentDidMount() {
        // fetch foodList
        this._fetchFoodList();
    }

    render() {
        const {dataSource, isLoading} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.taskDescription}>
                    <Text style={styles.welcomeText}>Nutrition Info ListView</Text>
                    <Text style={styles.descriptionText}>On this screen you'll use the ListView component and the
                        Nutritionix API (https://www.nutritionix.com/business/api).</Text>
                    <Text style={styles.descriptionText}>
                        Implement a ListView that displays the nutrition information for at least 51 items on the menu
                        of your favorite fast food restaurant. Feel free to add styling, embellishments, or any other
                        features you'd like!</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Starbucks Menu ({this._data.length})</Text>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={this._renderRow.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    renderSeparator={(sectionID, rowID) => <View key={`${rowID}`} style={styles.separator}/>}
                    enableEmptySections={true}
                    initialListSize={50}
                    pageSize={50}
                    style={styles.listContainer}
                />
                {
                    isLoading &&
                    this._showIndicator()
                }
            </View>
        );
    }

    _showIndicator() {
        return (
            <View style={{backgroundColor: '#f1f1e8'}}>
                <ActivityIndicator size={'large'} color={'lightgray'}/>
            </View>
        )
    }

    _onEndReached() {
        this._dataLowerIndex += 50;
        this._dataUpperIndex += 50;
        if (this._dataLowerIndex > this._dataLength) this._dataLowerIndex = this._dataLength;

        if (this._dataUpperIndex > this._dataLength) this._dataUpperIndex = this._dataLength;

        this._fetchFoodList();
    }

    _renderRow(rowData, sectionID, rowID) {
        const fields = rowData.fields;

        return (
            <View style={styles.rowContainer}>

                <View style={styles.foodNameContainer}>
                    <View style={{width: Dimensions.get('window').width * 0.7}}>
                        <Text style={styles.foodTitle} numberOfLines={1}>
                            {fields.item_name}
                        </Text>
                    </View>
                    <Text style={styles.foodCalories}>
                        {fields.nf_calories} calories
                    </Text>
                </View>
                <View style={styles.detailButton}>
                    <Text style={styles.detailbuttonText}>DETAILS</Text>
                </View>
            </View>
        )
    }

    _fetchFoodList() {
        // fetch images via Pixabay API
        const data = {
            baseUrl: 'https://api.nutritionix.com/v1_1/search/',
            brand_id: '513fbc1283aa2dc80c00001f',
            results: this._dataLowerIndex + ':' + this._dataUpperIndex,
            cal_min: 0,
            cal_max: 50000,
            fields: '*',
            appId: 'ef145797',
            appKey: '8458752a99245bea8d24f01d025cceb5',
        };

        // show isLoading...
        this.setState({isLoading: true});

        fetch(`${data.baseUrl}?brand_id=${data.brand_id}&results=${data.results}&cal_min=${data.cal_min}
        &cal_max=${data.cal_max}&fields=${data.fields}&appId=${data.appId}&appKey=${data.appKey}`)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                this._dataLength = responseJson.total_hits;
                this._data = this._data.concat(responseJson.hits);
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskDescription: {
        marginBottom: 24,
        maxHeight: 200,
    },
    descriptionText: {
        fontSize: 14,
        color: 'rgba(67,100,109, 1)',
        lineHeight: 15,
        textAlign: 'center',
        paddingTop: 10,
    },
    welcomeText: {
        fontSize: 17,
        color: 'rgba(67,100,109, 1)',
        lineHeight: 23,
        textAlign: 'center',
        paddingTop: 55,
    },
    sectionContainer: {
        paddingLeft: 16,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#c0a666',
    },
    sectionTitle: {
        fontFamily: Platform.OS === 'ios'? 'Helvetica' : 'sans-serif',
        fontSize: 16,
        textAlign: 'left',
        color: 'white'
    },
    listContainer: {
        maxHeight: Dimensions.get('window').height - 200 - 55.5,
        backgroundColor: '#f1f1e8',
    },
    rowContainer: {
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 8,
        paddingTop: 16,
        paddingBottom: 16,
        marginRight: 8,
        backgroundColor: '#fff9f8',
    },
    foodNameContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingLeft: 16,
    },
    foodTitle: {
        fontFamily: Platform.OS === 'ios'? 'Helvetica' : 'sans-serif-medium',
        fontWeight: '400',
        fontSize: 16,
        color: '#3A3A3A',
        textAlign: 'left',
    },
    foodCalories: {
        fontFamily: Platform.OS === 'ios'? 'Helvetica' : 'sans-serif',
        fontSize: 12,
        color: 'rgba(58, 58, 58, 1.00)',
        textAlign: 'left',
    },
    detailButton: {
        borderRadius: 4,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        marginRight: 16,
        backgroundColor: 'transparent',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c0a666',
        alignItems: 'center'
    },
    detailbuttonText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#c0a666'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#EFEEED',
        marginLeft: 16,
    },
});
