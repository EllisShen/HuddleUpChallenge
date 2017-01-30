import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Alert,
} from 'react-native';
const base64 = require('base-64');

const defaultHeight = 46;
export default class SettingsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            contentHeight: defaultHeight,
            text: '',
        };

        this._onSumbit = this._onSumbit.bind(this);
    }

    _onSumbit() {
        const {text} = this.state;
        const data = {
            baseUrl: 'https://api.mailgun.net/v3/sandbox72bafd279cbf4f45b7872813cb55da48.mailgun.org/messages',
            from: 'Mailgun Sandbox <postmaster@sandbox72bafd279cbf4f45b7872813cb55da48.mailgun.org>',
            to: 'weichu.shenx@gmail.com',
            subject: 'Challenge App Feedback (please ignore)',
        };

        fetch(data.baseUrl, {
            method: 'post',
            headers: {
                'Authorization': 'Basic '+ base64.encode('api:key-df7c8d751fca89c1c1f4d96f7fe9ed3e'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `from=${data.from}&to=${data.to}&subject=${data.subject}&text=${text}`
        })
            .then((response) => {
                // console.debug(response);
                if (response.status == 200) {
                    Alert.alert('Thank you', 'Feedback sent successfully', [{text: 'OK'}]);
                }
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Error', 'Error = ' + error, [{text: 'OK'},])
            });

    }

    render() {
        const {contentHeight} = this.state;

        return (
            <ScrollView style={styles.container}>

                <View style={styles.taskDescription}>
                    <Text style={styles.welcomeText}>React Native Feedback</Text>
                    <Text style={styles.descriptionText}>Let us know what you think of React Native so far!</Text>
                    <Text style={styles.descriptionText}>Complete this form, and modify it to send the input to
                        dan@letshuddleup.com.</Text>
                    <Text style={styles.descriptionText}>Feel free to choose your own email API.</Text>
                </View>
                <View style={{marginLeft: 16, marginRight: 16, marginBottom: 16}}>
                    <Text style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.54)', textAlign: 'left'}}>
                        Email your feedback:
                    </Text>
                    <TextInput
                        style={[styles.textInput, {height: contentHeight, borderColor: 'lightgray', borderWidth: 1, padding: 8}]}
                        multiline={true}
                        autoCapitalize={'sentences'}
                        blurOnSubmit={true}
                        keyboardType='default'
                        underlineColorAndroid='white'
                        placeholder='  Let us know what you think!'
                        placeholderTextColor='#EFEEED'
                        onChangeText={(text) => this.setState({text})}
                        onContentSizeChange={this._onContentSizeChanged.bind(this)}
                        value={this.state.text}
                    />

                </View>
                <TouchableHighlight onPress={this._onSumbit}>
                    <View style={{flex: 0, backgroundColor: '#1E8CF3', paddingTop: 4, paddingBottom: 4}}>
                        <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
                            Submit
                        </Text>
                    </View>
                </TouchableHighlight>



            </ScrollView>
        );
    }

    _onContentSizeChanged({ nativeEvent: { contentSize: { width, height } } }) {
        if (height > defaultHeight)
            this.setState({contentHeight: height});
        else
            this.setState({contentHeight: defaultHeight});
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
    textInput: {
        flex: 1,
        height: defaultHeight,
        fontSize: 16,
        color: 'black',
    },
});
