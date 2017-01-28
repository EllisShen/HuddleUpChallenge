import React from 'react';
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class HomeScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
        },
    };

    constructor(props) {
        super(props);
        this._fetchImages = this._fetchImages.bind(this);
    }

    componentWillMount() {
        // fetch images
        this._fetchImages();
    }

    componentWillReceiveProps() {
        // refetch images if _imagesArray is null
        if (this._imagesArray) {
            this._fetchImages();
        }
    }

    render() {
        // const {imageObj} = this.state;
        let imageObj;
        if (this._imagesArray) {
            imageObj = this._imagesArray[this._getRandomInteger(0, this._imagesArray.length - 1)];
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Welcome to HuddleUp Challenge!</Text>
                <Text style={styles.descriptionText}>You have three tasks to make this into a functional app. </Text>
                <Text style={styles.descriptionText}>
                    Below you'll see a static image. On this screen you'll use the Pixabay API (www.pixabay.com) to load
                    a random image whenever you return to this tab.</Text>
                <View style={styles.pixabayImage}>
                    {
                        imageObj &&
                        <Image
                            style={{width: 320, height: 240, marginTop: 20}}
                            source={{uri: imageObj.webformatURL}}
                            resizeMode={'cover'}
                        />
                    }
                </View>
            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will run slightly slower but
                    you have access to useful development tools. {learnMoreButton}.
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _fetchImages() {
        // fetch images via Pixabay API
        const data = {
            baseUrl: 'https://pixabay.com/api/',
            key: '4391238-8e0e66f36eef8aa34267304cf',
            q: 'tokyo_japan',
            image_type: 'photo',
        };

        fetch(`${data.baseUrl}?key=${data.key}&q=${data.q}&image_type=${data.image_type}`)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                this._imagesArray = responseJson.hits;
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _handleLearnMorePress = () => {
        Linking.openURL('https://docs.getexponent.com/versions/latest/guides/development-mode');
    }

    _handleHelpPress = () => {
        Linking.openURL('https://docs.getexponent.com/versions/latest/guides/up-and-running.html#can-t-see-your-changes');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 15,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 80,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 200,
        height: 34.5,
        marginTop: 3,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
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
    pixabayImage: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
});
