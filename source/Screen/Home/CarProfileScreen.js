import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  Animated,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import PerformanceCard from "../../Component/Utils/CarProfileScreenUtils/PerformanceCardUtil";
import ParallaxGallery from "../../Component/Utils/CarProfileScreenUtils/ParallaxGalleryUtil";
import LinkPreview from "react-native-link-preview";
import {
  FontAwesome5,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";
import { ImageBackground } from "react-native";
import { CommonActions, Link } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import Color from "../../../assets/Color";
import styles from "./HomeStyles/CarProfileScreenStyles";
import {
  variantList,
  colorVariantList,
} from "../../../model/Data/carProfiledata";
import { useDispatch, useSelector } from "react-redux";
import { addVechile_1 } from "../../Store/action/compareCar";
import * as Cars from "../../Store/action/likedCars";
import BigSlide from "../../Component/Utils/CarProfileScreenUtils/BigSlidePhotoUtil";
import SmallSlide from "../../Component/Utils/CarProfileScreenUtils/SmallSlidePhotoUtil";
import FeatureModel from "../../Component/Utils/CarProfileScreenUtils/FeatureModal";

//constants

const { width, height } = Dimensions.get("window");

const CarProfilePage = ({ navigation, route }) => {
  //hooks

  const dispatch = useDispatch();

  //from props

  const item = route.params.item;
  const list = route.params?.list;

  //from redux

  const companyList = useSelector((state) => state.company.companyList);
  const feature = useSelector((state) => state.feature.featureList);
  const likecarList = useSelector((state) => state.likedCars.likedCarList);

  //Input State

  const [colorname, setColorName] = useState();
  const [indexColor, setIndexColor] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoCarIndex, setPhotoCarIndex] = useState();

  //validation State

  const [likedCar, setLikedCar] = useState(false);

  //Ref

  const modalize = useRef();
  const modalizeSafety = useRef();
  const modalizeColor = useRef();
  const modalizeDesc = useRef();
  const topRef = useRef();
  const thumbRef = useRef();
  const photoSlideRef = useRef();

  //Constants

  const comp = companyList.filter((state) => state.companyid == item.companyId);

  const exteriorFeature = feature.filter(
    (fe) => fe.name == "ext" && fe.carid == item.carId
  );
  const safetyFeature = feature.filter(
    (fe) => fe.name == "comfort" && fe.carid == item.carId
  );
  const gallery = feature.filter(
    (fe) => fe.name == "gallery" && fe.carid == item.carId
  );
  const likecar = likecarList.filter((car) => car.carId === item.carId);

  const features = [
    {
      value: item.battery,
      title: "Battery",
      component: (
        <Feather
          style={{ alignSelf: "center" }}
          name="battery-charging"
          size={24}
          color={"white"}
        />
      ),
    },
    {
      value: item.range,
      title: "Range",
      component: (
        <FontAwesome5
          style={{ alignSelf: "center" }}
          name="road"
          size={24}
          color={"white"}
        />
      ),
    },
    {
      value: item.horse,
      title: "Horse",
      component: (
        <FontAwesome5
          style={{ alignSelf: "center" }}
          name="horse-head"
          size={24}
          color={"white"}
        />
      ),
    },
    {
      value: item.torque,
      title: "Torque",
      component: (
        <FontAwesome
          style={{ alignSelf: "center" }}
          name="gears"
          size={24}
          color={"white"}
        />
      ),
    },
    {
      value: item.speed,
      title: "0-100Km/h",
      component: (
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          name="speedometer"
          size={24}
          color={"white"}
        />
      ),
    },
  ];

  /***********UseEffects*******/
  useEffect(() => {
    if (likecar.length == 0) {
      setLikedCar(false);
    } else {
      setLikedCar(true);
    }
  }, []);

  /***********function************/

  const getCatLogo = (data) => {
    switch (data) {
      case "tata":
        return require("../../../assets/Images/Tata.png");

      case "hyundai":
        return require("../../../assets/Images/Hyundai.png");

      case "morris garage":
        return require("../../../assets/Images/MG.png");

      case "audi":
        return require("../../../assets/Images/Audi.png");

      case "mercedes":
        return require("../../../assets/Images/Mercedes.png");

      default:
        null;
    }
  };
  const openWhatsApp = () => {
    let url =
      "whatsapp://send?text=" +
      `Hey can I get to know about ${item.name}` +
      "&phone=91" +
      "9820769479";
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened successfully " + { item }); //<---Success
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device"); //<---Error
      });
  };

  const openModalHandler = (car, index) => {
    photoSlideRef.current?.open();
    setPhotoCarIndex(index);
  };
  const onPress = (index, title) => {
    modalizeColor.current?.open();
    setIndexColor(index);
    setColorName(title);
  };

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    const image_size = 100;
    const space = 10;
    if (index * (image_size + space) - image_size / 2 > width / 4) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (image_size + space) - width / 4 + image_size / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  const changeState = () => {
    setLikedCar((prxev) => !prev);
  };

  /**********rendering*********/
  return (
    <View style={styles.screen}>
      {/* Content Panel */}

      <ScrollView
        //stickyHeaderIndices={[0]}
        style={styles.scroll}
      >
        {/* Bigger Images Slide Panel */}

        <BigSlide
          topRef={topRef}
          gallery={gallery}
          carId={item.carId}
          scrollToActiveIndex={scrollToActiveIndex}
          openModalHandler={openModalHandler}
        />

        {/* Like Car Panel */}

        <TouchableOpacity
          style={{ position: "absolute", alignSelf: "flex-end", marginTop: 30 }}
          onPress={async () => {
            await setLikedCar((prev) => !prev);
            if (!likedCar) {
              await dispatch(Cars.addLikedCar(item.carId));
            } else {
              await dispatch(Cars.dislikedCar(item.carId));
              await dispatch(Cars.fetchLikedCar());
            }
          }}
        >
          <AntDesign
            name={likedCar ? "heart" : "hearto"}
            size={24}
            color={likedCar ? Color.lightgreen : "white"}
            style={styles.heart}
          />
        </TouchableOpacity>

        {/*  Smaller Car Image SLide Panel */}

        <SmallSlide
          thumbRef={thumbRef}
          gallery={gallery}
          scrollToActiveIndex={scrollToActiveIndex}
          activeIndex={activeIndex}
        />

        {/* Brand Info Panel */}

        <View style={styles.BrandInfo}>
          {/* Logo panel */}

          <View style={styles.BrandView}>
            {comp[0].type === "car" ? (
              <Image
                resizeMode="contain"
                style={styles.Brand}
                source={getCatLogo(comp[0].name)}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={styles.Brand}
                source={{ uri: comp[0].logoImg }}
              />
            )}
          </View>

          {/* Car Name */}

          <Text style={styles.BrandName}>{item.name.toUpperCase()}</Text>
          <Text style={styles.BrandRate}>
            Starting <Text style={{ color: Color.lightgreen }}>@</Text> ₹
            {item.startPrice}*
          </Text>
        </View>

        {/* Go TO Whatsapp Panel */}

        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: Color.lightgreen, borderWidth: 0.75 },
          ]}
          onPress={() => {
            openWhatsApp();
          }}
        >
          <FontAwesome name="whatsapp" size={24} color={Color.lightgreen} />
          <Text
            style={{
              color: Color.lightgreen,
              fontFamily: "medium",
              alignSelf: "center",
            }}
          >
            Enquire on whatsApp
          </Text>
        </TouchableOpacity>

        {/* Compare the Car Panel */}

        <Pressable
          style={[styles.button, { backgroundColor: Color.lightgreen }]}
          onPress={() => {
            dispatch(addVechile_1(item));
            navigation.navigate("CarCompare");
          }}
        >
          <MaterialIcons name="compare" size={24} color="black" />
          <Text
            style={{
              color: "black",
              fontFamily: "medium",
              alignSelf: "center",
            }}
          >
            Compare the car
          </Text>
        </Pressable>

        {/* Key Specs Panel */}

        <View>
          <Text style={styles.header}>Key Specs</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={features}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <PerformanceCard
                  icon={item.component}
                  title={item.title}
                  number={item.value}
                />
              );
            }}
          />
        </View>

        {/* Modal Panels */}

        <View style={{ alignItems: "center", marginTop: 50 }}>
          {/* Interior and Exterior Panel */}

          <Pressable onPress={() => modalize.current?.open()}>
            <ImageBackground
              resizeMode="cover"
              style={styles.features}
              blurRadius={2}
              source={{
                uri: "https://imgd.aeplcdn.com/0x0/cw/ec/29580/Hyundai-Kona-Electric-Dashboard-162432.jpg?wm=0",
              }}
            >
              <Text style={styles.featuresText}>
                {"Interior &\n Exterior Features"}
              </Text>
            </ImageBackground>
          </Pressable>
          {/* Description Panel */}

          {/* Safety and Comfort Panel */}

          <Pressable onPress={() => modalizeSafety.current?.open()}>
            <ImageBackground
              resizeMode="cover"
              style={styles.features}
              blurRadius={2}
              source={{
                uri: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Kona/Safety/pc/Hyundai-Kona-electric-safety-top-1.jpg",
              }}
            >
              <Text style={styles.featuresText}>
                {"Safety &\n Comfort Features"}
              </Text>
            </ImageBackground>
          </Pressable>
        </View>
        <View>
          <Text style={styles.AboutTheCar}>About The Car</Text>
          <TouchableOpacity
            onPress={() => {
              modalizeDesc.current?.open();
            }}
            style={styles.description}
          >
            <Text style={styles.descText}>
              {item.description.slice(0, 75)}...
            </Text>
            <Text style={styles.readMore}>Read more?</Text>
          </TouchableOpacity>
        </View>

        {/* Variants Panel */}

        <View>
          <Text style={styles.header}>Variants</Text>
          <FlatList
            style={styles.IconArrange}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.Constyle}
            horizontal
            data={variantList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.BoxView}>
                  <Image
                    style={styles.EveelLogo}
                    source={require("../../../assets/Images/map-pointer-multi.png")}
                  />
                  <Text style={styles.Variants}>{item.name}</Text>
                  <Text style={styles.BrandVar}>Hyundai Kona</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              );
            }}
          />
        </View>

        {/* Color Modal Panel */}

        <View style={styles.ColorView}>
          <Text style={styles.header}>Colors</Text>
          <FlatList
            style={styles.IconArrange}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.Constyle}
            horizontal
            data={colorVariantList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ index, item }) => {
              return (
                <View style={styles.ColorBoxView}>
                  <Pressable
                    onPress={() => onPress(index, item.name)}
                    style={[
                      styles.color,
                      {
                        backgroundColor: item.hexCode,
                      },
                    ]}
                  />
                  <Text style={styles.ColorName}>{item.name}</Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>

      {/* Modals Panel */}

      <FeatureModel
        modalize={modalize}
        firstLine={"Exterior"}
        secondLine={"Interior"}
        List={exteriorFeature}
      />
      <FeatureModel
        modalize={modalizeSafety}
        firstLine={"Safety"}
        secondLine={"Comfort Feature"}
        List={safetyFeature}
      />
      <Modalize
        modalHeight={Dimensions.get("window").height * 0.6}
        ref={modalizeColor}
      >
        <View style={styles.ColorModalView}>
          <View style={styles.ColorModal}>
            <Animated.Image
              style={styles.ColorModalImg}
              source={{
                uri: "https://stimg.cardekho.com/images/car-images/930x620/Hyundai/Hyundai-Kona/6234/1562660896827/222_phantom-black_050505.jpg?tr=w-880,h-495",
              }}
              resizeMode="cover"
            />
            <>
              <Text style={styles.ColorIndex}>{indexColor}.</Text>
              <Text style={styles.ColorModalName}>{colorname}</Text>
            </>
          </View>
        </View>
      </Modalize>
      <Modalize
        modalHeight={Dimensions.get("window").height * 0.8}
        ref={modalizeDesc}
        modalStyle={{ backgroundColor: "black" }}
      >
        <View style={styles.ModalView}>
          <View style={{ margin: 20 }}>
            <Text style={styles.AboutTheCar}>About the car</Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <YoutubeIframe
              height={250}
              width={Dimensions.get("window").width * 0.98}
              webViewStyle={{ borderRadius: 10 }}
              play={false}
              videoId={item.youtube}
            />
          </View>
          <View style={{ margin: 15 }}>
            <Text style={[styles.descText, { fontSize: 20 }]}>
              {item.description}
            </Text>
          </View>
        </View>
      </Modalize>
      <Modalize
        modalHeight={Dimensions.get("window").height * 0.8}
        ref={photoSlideRef}
        modalStyle={{ backgroundColor: "black" }}
      >
        <View style={{ justifyContent: "center", alignSelf: "center" }}>
          <FlatList
            initialScrollIndex={photoCarIndex}
            horizontal
            keyExtractor={(_, i) => i.toString()}
            data={gallery}
            snapToAlignment={"center"}
            snapToInterval={Dimensions.get("window").width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("screen").height / 2,
                    padding: 5,
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: item.image }}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
          />
          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: Color.lightgreen,
                fontFamily: "bold",
                fontSize: 24,
              }}
            >
              Slide for more
            </Text>
          </View>
        </View>
      </Modalize>
    </View>
  );
};

export default CarProfilePage;
