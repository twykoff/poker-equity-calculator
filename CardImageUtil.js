import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';





const getImageSource = {
    getImageSource: function(cardValue) {
        
        switch (cardValue.toLowerCase()) {
            case "as":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_ace.png")};
            case "ks":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_king.png")};
            case "qs":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_queen.png")};
            case "js":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_jack.png")};
            case "ts":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_10.png")};
            case "9s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_9.png")};
            case "8s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_8.png")};
            case "7s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_7.png")};
            case "6s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_6.png")};
            case "5s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_5.png")};
            case "4s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_4.png")};
            case "3s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_3.png")};
            case "2s":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/spades_2.png")};
            case "2h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_2.png")};
        
            case "ah":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_ace.png")};
            case "kh":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_king.png")};
            case "qh":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_queen.png")};
            case "jh":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_jack.png")};
            case "th":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_10.png")};
            case "9h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_9.png")};
            case "8h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_8.png")};
            case "7h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_7.png")};
            case "6h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_6.png")};
            case "5h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_5.png")};
            case "4h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_4.png")};
            case "3h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_3.png")};
            case "2h":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/hearts_2.png")};

            case "ac":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_ace.png")};
            case "kc":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_king.png")};
            case "qc":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_queen.png")};
            case "jc":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_jack.png")};
            case "tc":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_10.png")};
            case "9c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_9.png")};
            case "8c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_8.png")};
            case "7c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_7.png")};
            case "6c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_6.png")};
            case "5c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_5.png")};
            case "4c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_4.png")};
            case "3c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_3.png")};
            case "2c":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/clubs_2.png")};

            case "ad":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_ace.png")};
            case "kd":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_king.png")};
            case "qd":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_queen.png")};
            case "jd":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_jack.png")};
            case "td":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_10.png")};
            case "9d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_9.png")};
            case "8d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_8.png")};
            case "7d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_7.png")};
            case "6d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_6.png")};
            case "5d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_5.png")};
            case "4d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_4.png")};
            case "3d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_3.png")};
            case "2d":
                return {imageSource: require("./assets/svg/fronts/png_96_dpi/diamonds_2.png")};            
            default:
                return {imageSource: require("./assets/svg/backs/png_96_dpi/blue.png")};
        }
    }
}

export default getImageSource;

