import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import {
    ExponentLinksView,
} from '@exponent/samples';

export default class LinksScreen extends React.Component {
    static route = {
        navigationBar: {
            title: 'Links',
        },
    }

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['McCafe Mocha, Large - calories: 500',
                'McCafe Hot Chocolate, Small - calories: 360',
                'Etc.']),
        };
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={this.props.route.getContentContainerStyle()}>
                <View>
                    <Text style={styles.welcomeText}>Nutrition Info ListView</Text>
                    <Text style={styles.descriptionText}>On this screen you'll use the ListView component and the
                        Nutritionix API (https://www.nutritionix.com/business/api).</Text>
                    <Text style={styles.descriptionText}>
                        Implement a ListView that displays the nutrition information for at least 51 items on the menu
                        of your favorite fast food restaurant. Feel free to add styling, embellishments, or any other
                        features you'd like!</Text>
                </View>
                <Text style={styles.welcomeText}>McDonalds!</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                />

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
    },
    descriptionText: {
        fontSize: 14,
        color: 'rgba(67,100,109, 1)',
        lineHeight: 15,
        textAlign: 'left',
        paddingTop: 10,
    },
    welcomeText: {
        fontSize: 17,
        color: 'rgba(67,100,109, 1)',
        lineHeight: 23,
        textAlign: 'center',
        paddingTop: 55,
    },
});
