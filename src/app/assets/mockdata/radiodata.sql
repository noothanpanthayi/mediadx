postgres

INSERT INTO radio (
  id, category, medianame, stream, website, frequency,
  location, type, hits, approved, priority, courtesy, courtesylink
)
VALUES (
  1029, 
  'international', 
  'BBC World Service', 
  'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service', 
  'https://www.bbc.co.uk/worldserviceradio', 
  '', 
  'London, UK', 
  'News & Talk Radio', 
  100, 
  'y', 
  1, 
  NULL, 
  NULL
);


INSERT INTO radio (
  id, category, medianame, stream, website, frequency,
  location, type, hits, approved, priority, courtesy, courtesylink
)
VALUES
(1016, 'malayalam', 'Rd. Media Village', 'https://443-1.autopo.st/183/stream', 'https://www.mediavillageindia.com/radio.html', '90.8 FM', 'Kottayam, India', 'Community Radio from SJCC', 100, 'y', 10, NULL, NULL),

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 05, 2025 at 09:44 PM
-- Server version: 10.5.25-MariaDB-cll-lve
-- PHP Version: 8.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `relaxint_digitalmedia`
--

-- --------------------------------------------------------

--
-- Table structure for table `radio`
--

CREATE TABLE `radio` (
  `id` int(4) NOT NULL,
  `category` varchar(50) NOT NULL,
  `medianame` varchar(50) NOT NULL,
  `stream` varchar(500) NOT NULL,
  `website` varchar(500) NOT NULL,
  `frequency` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `hits` bigint(20) NOT NULL,
  `approved` varchar(1) NOT NULL,
  `speed` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `radio`
--

(1052, 'hindi', 'Masala Radio', 'https://s3.voscast.com:10201/stream.mp3', 'https://masalaradio.com/', '', 'Houston, USA', 'Music Radio', 100, 'n', 100),


INSERT INTO `radio` (`id`, `category`, `medianame`, `stream`, `website`, `frequency`, `location`, `type`, `hits`, `approved`, `courtesy`) VALUES
(1001, 'international', 'Voice Of America', 'https://voa28.akacast.akamaistream.net/7/325/437810/v1/ibb.akacast.akamaistream.net/voa28', 'https://www.voanews.com/', '', 'Washington D.C', 'News and Music', 100, 'y', 100),
(1003, 'international', 'Sputnik Radio', 'https://nfw.ria.ru/flv/audio.aspx?ID=40881855&type=mp3', 'https://sputniknews.com/', '', 'Moscow, Russia', 'News & Talk Radio', 100, 'n', 3),
(1017, 'malayalam', 'Radio Mix', 'http://78.129.229.120:14215/;', 'http://njanmalayalee.com/', '90.8 FM', 'Delhi, India', 'Music Radio', 100, '', 100),
(1018, 'malayalam', 'Radio Onatukara', 'http://stream.zeno.fm/fu94u25kqd0uv', 'http://www.radioonattukara.com/', '', 'Dubai, UAE', 'Music Radio', 100, 'n', 100),
(1019, 'malayalam', 'Oman Malayalam', 'https://eu5.fastcast4u.com/proxy/vgfquawo?mp=/1', 'http://omanmalayalam.com/', '', 'Muscat, Oman', 'Music & News Radio', 100, 'n', 100),
(1020, 'malayalam', 'Kuwait1FM', 'http://freeuk3.listen2myradio.com:27249/1/stream?type=http&nocache=2', 'http://kuwait1fm.com/', '', 'Kuwait', 'Music & News Radio', 100, 'n', 100),
(1021, 'malayalam', 'Dubai 1 FM', 'http://91.121.222.81:8306/stream', '#', '', 'Dubai, UAE', 'Music Radio', 100, 'n', 100),
(1022, 'malayalam', 'LMR', 'https://ais-edge51-live365-dal02.cdnstream.com/a50671', 'http://www.lmrradio.co.uk/', '', 'London, UK', 'Music & Talk Radio', 100, 'n', 100),
(1023, 'malayalam', 'Radio Maharani', 'http://audiocp.globaliway.co.in:7235/start/maharani/;stream.mp3', 'https://www.facebook.com/maharaniradio/', '', 'Nilambur, India', 'Music Radio', 100, 'n', 100),
(1024, 'malayalam', 'Paattu Petti', 'https://listen.radioking.com/radio/305023/stream/354512', 'http://www.paattupetti.com/', '', 'Australia', 'Music Radio', 100, 'y', 100),
(1026, 'malayalam', 'Radio Kairali', 'http://162.244.80.106:10994/live', 'http://radiokairali.blogspot.com/', '', 'Kerala, India', 'Music Radio', 100, 'n', 100),
(1027, 'music', 'BBC Radio 1', 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p', 'https://www.bbc.co.uk/radio1', '96.9 FM', 'London, UK', 'Music Radio', 100, 'n', 4),
(1028, 'music', 'VOA1 The Hits', 'https://voa22.akacast.akamaistream.net/7/331/437804/v1/ibb.akacast.akamaistream.net/voa22', 'https://www.voanews.com/', '', 'Washington D.C', 'Voice of  America', 100, 'y', 0),
(1029, 'international', 'BBC World Service', 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service', 'https://www.bbc.co.uk/worldserviceradio', '', 'London, UK', 'News & Talk Radio', 100, 'y', 1),
(1030, 'music', 'D100 Radio', 'http://los.cdnstream.com/1119_128', 'https://d100radio.com/', '', 'New York, USA', 'Music Radio', 100, 'y', 1),
(1031, 'music', 'Sun FM', 'https://radio.lotustechnologieslk.net:2020/stream/sunfmgarden', 'http://www.sunfm.lk/', '98.9 FM', 'Sri Lanka', 'Hit After Hit, ALL Day...', 100, 'y', 0),
(1033, 'music', 'One FM 91.3', 'https://20663.live.streamtheworld.com/ONE_FM_913AAC.aac', 'https://www.onefm.sg/', '91.3 FM', 'Singapore', 'Retro Classics', 100, 'n', 100),
(1034, 'international', 'AIR Live News', 'https://radioindia.net/radio/esdcdn2_airakashvani/icecast.audio', 'http://prasarbharati.gov.in/AIR/index.php', '', 'All India Radio', 'News', 100, 'n', 100),
(1035, 'hindi', 'Diverse', 'http://109.169.46.197:8011/;', 'https://www.diversefm.com/', '102.8 FM', 'Bedfordshire, UK', 'Music Radio', 100, 'n', 3),
(1036, 'music', 'Magic Malta', 'http://s46.myradiostream.com:6076/listen.mp3', 'https://www.tvm.com.mt/mt/', '', 'Malta', 'Music Radio', 100, 'y', 100),
(1037, 'international', 'Radio Australia', 'http://live-radio01.mediahubaustralia.com/PBW/mp3/', 'https://radio.abc.net.au/', '', 'Melbourne, Australia', 'News & Talk Radio', 100, 'y', 4),
(1038, 'international', 'Radio France Int', 'http://live02.rfi.fr/rfienanglais-64.mp3', 'http://en.rfi.fr/', '', 'Paris, France', 'News & Talk Radio', 100, 'y', 2),
(1039, 'international', 'China Radio Intnl', 'http://sk.cri.cn/am846.m3u8', 'http://chinaplus.cri.cn/', '', 'Beijing, China', 'News & Talk Radio', 100, 'y', 4),
(1041, 'international', 'Fox News Talk', 'https://streaming-ent.shoutcast.com/foxnews', 'https://radio.foxnews.com', '', 'New York, USA', 'News & Talk Radio', 100, 'n', 100),
(1042, 'hindi', 'Evergreen Bollywd', 'http://103.16.47.70:7555/;stream.nsv', 'https://www.hungama.com/all/live-radio-52/21282/', '', 'India', 'Music Radio', 100, 'n', 100),
(1045, 'malayalam', 'Ente Radio', 'https://cast1.my-control-panel.com/proxy/enteradio/stream', 'http://enteradio.com/', '91.2 FM', 'Kollam, India', 'KRDA Community Radio', 10, 'y', 5),
(1049, 'malayalam', 'Radio Ganam', 'http://5.79.88.132:7104/;', '', '', 'India', 'Music Radio', 100, 'n', 100),
(1050, 'malayalam', 'Malayali Radio', 'http://91.121.164.210:8464/;stream.mp3', 'http://www.malayaliradio.us/', '', 'USA', 'Music Radio', 100, 'n', 100),
(1058, 'malayalam', 'Ananthapuri FM', 'http://59.90.28.91:88/broadwavehigh.mp3?src=1', 'http://www.airtvm', '101.9 FM', 'Tvm, Kerala', 'All India Radio', 100, 'y', 100),
(1060, 'malayalam', 'TCR Live', 'https://eu1.fastcast4u.com/proxy/tcrliveradio?mp=/1', 'https://tcrliveradio.blogspot.com/', '', 'Thrissur, India', 'Music Radio', 100, 'n', 100),
(1061, 'devotional', 'Radio Ayyappa', 'http://s35.myradiostream.com:28232/;', 'http://myradiostream.com/station/flashplayer.php?s=s35&p=28232', '', 'Kerala, India', 'Devotional Radio', 100, 'y', 100),
(1062, 'devotional', 'NM Bhakthi', 'http://91.121.222.81:8342/;', 'http://njanmalayalee.com/', '', 'Kerala, India', 'Devotional Radio', 100, 'n', 100),
(1063, 'devotional', 'Nadam Radio', 'http://5.79.88.132:7070/;', '#', '', 'Kerala, India', 'Devotional Radio', 100, 'n', 100),
(1065, 'international', 'Radio NZ', 'http://radionz-ice.streamguys.com/international.mp3', 'https://www.radionz.co.nz/', '', 'Wellington, New Zealand', 'News & Talk Radio', 100, 'y', 4),
(1066, 'music', 'Dance.FM', 'https://streams.dancefm.net/mp3-hq', 'https://dance.fm/', '', 'Amsterdam', 'The Beat  of Amsterdam', 100, 'n', 0),
(1067, 'music', 'Radio Disney', 'https://18683.live.streamtheworld.com:443/RADIODISNEYANDROID_SC?dist=radiodisney', 'https://radio.disney.com/', '', 'USA', 'Music Radio', 100, 'n', 100),
(1068, 'music', 'Dance Music', 'https://s35.maxcast.com.br:8074/live?id=325953239214', 'https://dancemusicsuperhits.com/', '', 'Brazil', 'Super Hits', 100, 'n', 1),
(1070, 'music', 'KissFM', 'http://stream3.radio.is:443/kissfm', 'https://www.kissfm.is', '104.5 FM', 'Reykjavik, Iceland', 'Music Radio', 100, 'n', 1),
(1073, 'malayalam', 'Radio Kerala', 'https://eu4.fastcast4u.com/proxy/radiokerala?mp=/1', 'http://radiokerala.in/', '', 'Cochin, Kerala', 'Kerala Media Academy', 100, 'y', 7),
(1074, 'malayalam', 'Radio Palakkad', 'https://stream.zeno.fm/ddt8y2uhb2zuv', 'https://radiopalakkad.blogspot.com/', '', 'Palakkad', 'Entertainment Radio', 100, 'y', 100),
(1075, 'malayalam', 'Ahalia Radio', 'https://fps1.listen2myradio.com:2199/listen.php?ip=95.154.228.120&port=8039&type=s1', 'http://ahaliafm.com/', '90.4 FM', 'Palakkad', '6 AM to 10 PM IST', 100, 'y', 100),
(1076, 'international', 'Swiss Radio', 'https://streamingr.broadcastradio.com:10295/wrs', 'https://worldradio.ch/', '', 'Switzerland', 'News & Talk Radio', 100, 'y', 100),
(1078, 'malayalam', 'Online Mal. Radio', 'http://5.79.88.132:7104/;', '', '', 'Kerala', 'Music Radio', 100, 'n', 100),
(1079, 'malayalam', 'India Live Radio', 'https://servidor27.brlogic.com:7290/live', 'https://indialiveradio.com/', '', 'Kerala', 'Music Radio', 100, 'n', 100),
(1080, 'devotional', 'BW - Hanuman', 'https://2bhanuman.out.airtime.pro/2bhanuman_a', 'http://www.bhaktiworld.com/', '', 'India', 'Devotional Radio', 100, 'y', 100),
(1081, 'devotional', 'BW - Sai', 'https://iskon2b.out.airtime.pro/iskon2b_a', 'http://www.bhaktiworld.com/', '', 'India', 'Devotional Radio', 100, 'y', 100),
(1082, 'devotional', 'Tiruvannamalai', 'http://janus.shoutca.st:8930/svstvm', 'http://tiruvannamalairadio.in/', '', 'Tamilnadu', 'Devotional Radio', 100, 'n', 100),
(1084, 'devotional', 'SVBC Radio', 'http://stream.mslive.in:8060/;stream.mp3', 'http://www.mslive.co.in/svbcradio/', '', 'Tirupati', 'Devotional Radio', 100, 'n', 100),
(1085, 'malayalam', 'Music Radio', 'https://bcovlive-a.akamaihd.net/19b535b7499a4719a5c19e043063f5d9/ap-southeast-1/6034685947001/profile_2/chunklist.m3u8', '', '', 'Ernakulam, India', 'Music Radio', 100, 'n', 100),
(1087, 'devotional', 'Radio Samskriti', 'http://37.59.28.208:8203/stream', 'http://greatmaster.info/samskritiradio/', '', 'Kerala, India', 'Devotional Radio', 100, 'n', 100),
(1088, 'malayalam', 'Radio Tirur', 'https://sonic01.instainternet.com/8002/stream', '', '', 'Tirur', 'Music & Talk Radio', 7, 'y', 1),
(1089, 'malayalam', 'AIR Malayalam', 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio230/playlist.m3u8', 'http://allindiaradio.gov.in/', '', 'Thiruvananthapuram', 'All India Radio', 200, 'n', 100),
(1090, 'malayalam', 'AIR Kozhikode', 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio082/playlist.m3u8', 'http://allindiaradio.gov.in/', '684 AM', 'Kozhikode', 'All India Radio', 200, 'y', 100),
(1091, 'malayalam', 'AIR Real FM', 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio083/playlist.m3u8\r\n', 'http://allindiaradio.gov.in/', '103.6 FM', 'Kozhikode', 'All India Radio', 200, 'y', 100),
(1092, 'malayalam', 'FM Rainbow', 'http://airlsmp2-lh.akamaihd.net/i/AIRLSMP054_1@350393/master.m3u8', 'http://allindiaradio.gov.in/', '107.5 FM', 'Kochi', 'All India Radio', 100, 'n', 100),
(1093, 'malayalam', 'Radio Mango', 'https://playerservices.streamtheworld.com/api/livestream-redirect/CLUBFMUAEAAC.aac', 'https://www.radiomango.fm/home.html/', '91.9 FM', 'KCI/TSR/CLT/KNR/ALP', 'Entertainment Radio', 100, 'n', 100),
(1095, 'malayalam', 'Radio Talky', 'https://media.streambrothers.com/stream/8104', 'https://radiotalky.com/', '', 'Thiruvananthapuram', 'Entertainment Radio', 100, 'y', 2),
(1096, 'malayalam', 'Radio Souparnika', 'https://servidor39-4.brlogic.com:7196/live', 'https://radiosouparnika.com/', '', 'London, UK', 'Music Radio', 100, 'n', 100),
(1097, 'malayalam', 'Radio Delhi', 'https://node-01.zeno.fm/ap5sacmsn7zuv?rj-ttl=5&rj-tok=AAABc63XY7IAdfOZirHvqAKgAA', 'http://radio.delhimalayalam.com/', '', 'Delhi', 'Music Radio', 100, 'y', 100),
(1098, 'malayalam', 'AIR Kavaratti', 'https://radioindia.net/radio/air_kkavarait/icecast.audio', 'https://prasarbharati.gov.in/homepage-air', '', 'Kavaratti', 'All India Radio', 100, 'n', 100),
(1099, 'music', 'Australian', 'http://listen10.as.amplifystreaming.com/radio/8000/amm_128.aac', 'https://www.ozmademusic.online/', '', 'Australia', 'Music Radio', 100, 'y', 100),
(1102, 'hindi', 'Goldy Cool', 'https://stream.zeno.fm/hhfmh86tfm8uv', '', '', 'India', 'Music Radio', 100, 'n', 3),
(1105, 'hindi', 'BollyBeatz', 'https://stream.radio.co/se14f2c7e3/listen', '', '', 'India', 'Music Radio', 100, 'n', 2),
(1112, 'malayalam', 'Radio Green', 'http://servidor15.brlogic.com:7110/live?type=.m3u', 'https://radiogreen.in/', '', 'Idukki, India', 'Music Radio', 10, 'n', 100),
(1113, 'international', 'Radio Romania Intnl', 'http://stream2.srr.ro:8052/;stream.nsv', 'https://www.rri.ro/en_gb/pages/home/', '', 'Bucharest, Romania', 'News & Music Radio', 100, 'y', 100),
(1116, 'malayalam', 'AIR Manjeri', 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio101/playlist.m3u8', 'http://allindiaradio.gov.in/', '102.7 FM', 'Manjeri', 'All India Radio', 200, 'y', 100),
(1117, 'malayalam', 'Mallu Radio Ireland', 'https://node-30.zeno.fm/y8nc8zy9qs8uv?rj-ttl=5&aw_0_req_lsid=fae26ca01d61e7109783c5ba7072479a&cto-uid=d8bb82d3-3757-413d-b729-78c21c916b21-61c8b482-5553&adt-uid=cuid_cc25cc03-8226-11ec-a3dd-12c360b7432c&amb-uid=8939965337071310036&rj-tok=AAABf3b5J1MAEktNRXA7NJOcFw&aw-uid=fae26ca01d61e7109783c5ba7072479a&dyn-uid=06030001_61c8b4868321c&dbm-uid=CAESEKbD34hBBcCwVnIDJpjHDaw&mm-uid=531761c8-b484-4b00-96c9-beaba2c6f269&triton-uid=cookie%3A1788bce9-47b9-4bec-af0f-3376fa7c3de0&an-uid=5981818934802139103&', '', '', '', '', 30, 'n', 100),
(1118, 'malayalam', 'Gramaphone', 'https://edge.mixlr.com/channel/axxln', '', '', '', '', 10, 'n', 100),
(1122, 'malayalam', 'AIR Thrissur', 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio036/playlist.m3u8', 'http://allindiaradio.gov.in/', '101.1 FM', 'Thrissur', 'All India Radio', 200, 'y', 100),
(1124, 'malayalam', 'AIR Kochi', 'https://air.pc.cdn.bitgravity.com/air/live/pbaudio045/playlist.m3u8', 'http://allindiaradio.gov.in/', '107.5 FM', 'Kochi', 'All India Radio', 200, 'y', 100),
(1125, 'malayalam', 'RLL Bengaluru', 'https://schedule.radiolemonlive.com:7443/radio/8000/live', 'https://www.radiolemonlive.com/', '', 'Bengaluru', 'Radio Lemon Live', 100, 'y', 12),
(1126, 'malayalam', 'RLL UK', 'https://schedule.radiolemonlive.com:7443/listen/radio_lemon_live_uk/live', 'https://www.radiolemonlive.com/leicester/index.php', '', 'Leicester, UK', 'Radio Lemon Live', 100, 'y', 13),
(1129, 'malayalam', 'Radio MACFAST', '', 'https://www.radiomacfast.org/index', '90.4 FM', 'Tiruvalla', 'Community Radio', 100, 'n', 100),
(1130, 'devotional', 'Malayalam Bhakthi', 'https://azuracloud.mydnsweb.com/radio/8040/radio.mp3', 'http://njanmalayalee.com/', '', 'Kerala, India', 'Devotional Radio', 100, 'n', 100),
(1131, 'hindi', 'B.Wd Udit Narayan', 'https://securestreams7.autopo.st/?uri=http://drive.uber.radio/uber/bollywooduditnarayan/icecast.audio', '', '', 'India', 'Music Radio', 100, 'n', 4),
(1132, 'tamil', 'Tamil Ragam', 'https://s9.reliastream.com/proxy/neville?mp=/stream', '', '', 'Sydney, Australia', 'Music Radio', 100, 'n', 100),
(1133, 'malayalam', 'Radio Kerala (IPRD)', 'http://103.133.180.223:8000/airtime_128', 'https://www.radio.kerala.gov.in/', '', 'Kerala', 'IPRD, Govt. of Kerala', 100, 'y', 100),
(1137, 'international', 'Sky News Radio', 'https://video.news.sky.com/snr/news/snrnews.mp3', 'https://news.sky.com/', '', 'London, UK', 'Latest World News', 100, 'y', 3),
(1138, 'malayalam', 'Hallos Radio', 'https://servidor36.brlogic.com:7132/live', '', '', 'Kerala, India', 'Entertainment Radio', 100, 'y', 100),
(1140, 'international', 'Radio Vaticana', 'https://radio.vaticannews.va/stream-en', 'https://www.vaticannews.va/en.html', '', 'Vatican City', 'News and Music', 100, 'y', 6),
(1141, 'malayalam', 'Voice of Alleppey', 'http://streamasiacdn.atc-labs.com/globalradio.aac', 'http://globalradio.in/', '91.2 FM', 'Alappuzha', 'Community Radio', 100, 'y', 9),
(1142, 'hindi', 'Radio Aashiqaana', 'https://sonic.onlineaudience.co.uk/8114/stream', '', '', 'Kanpur, India', 'Music Radio', 100, 'y', 10),
(1143, 'hindi', 'Bolly Hits Radio', 'http://hoth.alonhosting.com:1080/;', 'http://bollyhitsradio.com/playing.html', '', '', 'Music Radio', 100, 'y', 11),
(1144, 'tamil', 'Tamil Kuyil Radio', 'http://live.tamilkuyilradio.com:8095/;', 'https://tamilkuyilradio.com/', '', '', 'Music Radio', 100, 'y', 100),
(1145, 'tamil', 'Star Radio', 'https://n13.radiojar.com/7pzbvyzb7a0uv?rj-tok=AAABgTQ3fZ8A5mCziBvl_clcrQ&rj-ttl=5', 'https://starradiotamil.com/', '', '', 'Music Radio', 100, 'n', 100),
(1146, 'tamil', 'Pollachi FM', 'http://104.200.16.182:8000/;', '', '', '', 'Music Radio', 100, 'n', 100),
(1148, 'hindi', 'Love Radio', 'https://drive.uber.radio/uber/lrbollywood/icecast.audio', 'https://loveradio.love/', '', 'India', 'Love Songs Radio', 100, 'y', 8),
(1149, 'malayalam', 'rOne Radio', 'https://gains.reviveradio.net/proxy/roneradio?mp=/stream', 'https://roneradio.com/', '', 'Kochi, India', 'Entertainment Radio', 20, 'n', 4),
(1152, 'hindi', 'Tune India Radio', 'https://s2.radio.co/se5e166e2f/listen', 'https://tuneindiaradio.com.au/', '', 'Sydney, Australia', 'Music Radio', 6, 'y', 6),
(1153, 'music', '80s Hits', 'https://stream.zeno.fm/901d97mctv8uv', 'https://zeno.fm/radio/80shits/', '', 'USA', 'Music Radio', 100, 'n', 1),
(1154, 'hindi', 'Shah Rukh Khan', 'https://drive.uber.radio/uber/bollywoodshahrukhkhan/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1155, 'hindi', 'Alka Yagnik', 'https://drive.uber.radio/uber/bollywoodalkayagnik/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1156, 'hindi', 'A.R. Rahman', 'https://drive.uber.radio/uber/bollywoodarrahman/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1157, 'hindi', 'Asha Bhosle', 'https://drive.uber.radio/uber/bollywoodashabhosle/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1158, 'hindi', 'Kishore Kumar', 'https://drive.uber.radio/uber/bollywoodkishorekumar/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1159, 'hindi', 'Shreya Ghoshal', 'https://drive.uber.radio/uber/bollywoodshreyaghosal/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1160, 'hindi', 'Sonu Nigam', 'https://drive.uber.radio/uber/bollywoodsonunigam/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1161, 'hindi', 'Udit Narayan', 'http://drive.uber.radio/uber/bollywooduditnarayan/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1162, 'hindi', 'Lata Mangeshkar', 'https://drive.uber.radio/uber/bollywoodlatamangeshkar/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1163, 'hindi', 'Sunidhi Chauhan', 'https://drive.uber.radio/uber/bollywoodsunidhichauhan/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 201),
(1164, 'hindi', 'Diwali Party', 'https://drive.uber.radio/uber/bollywooddiwali/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'y', 100),
(1165, 'hindi', 'Bollywood Mix', 'https://drive.uber.radio/uber/bollywoodmix/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'y', 0),
(1166, 'hindi', 'Bollywood Love', 'https://drive.uber.radio/uber/bollywoodlove/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 0),
(1167, 'hindi', 'Bollywood Now', 'https://drive.uber.radio/uber/bollywoodnow/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'y', 0),
(1168, 'hindi', 'Bollywood Workout', 'https://drive.uber.radio/uber/bollywoodworkout/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'y', 0),
(1169, 'hindi', 'Bollywood Dance', 'https://drive.uber.radio/uber/bollywooddance/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'y', 0),
(1170, 'hindi', 'Atif Aslam', 'https://drive.uber.radio/uber/bollywoodatifaslam/icecast.audio', '', '', 'India', 'Bollywood Hits', 201, 'n', 0),
(1171, 'malayalam', 'KJ Yesudas', 'https://stream-37.zeno.fm/9x1sw687nf9uv', '', '', 'India', 'Music Radio', 100, 'n', 6),
(1182, 'international', 'Bloomberg Radio', 'https://22123.live.streamtheworld.com/WBBRAMAAC48/HLS/bb8f63e2-f844-4fc2-86d5-438db5bea1df/0/playlist.m3u8', 'https://www.bloombergradio.com/', '', 'New York', 'News & Talk Radio', 100, 'n', 1),
(1183, 'devotional', 'Krishna', 'http://millenniumhits.out.airtime.pro:8000/millenniumhits_a', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1184, 'devotional', 'Bhagavad Gita', 'https://stream.zeno.fm/ijklcild1wrtv', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1185, 'devotional', 'By Yesudas', 'https://stream-162.zeno.fm/tf9z6bres18uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ0Zjl6NmJyZXMxOHV2IiwiaG9zdCI6InN0cmVhbS0xNjIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjY0OHF2QjZxU1BHZnNtNWEtcU91T3ciLCJpYXQiOjE3Mjg1ODU0MzgsImV4cCI6MTcyODU4NTQ5OH0.9IBYBDCJL31dtkuwPQrfGr41jkuLfWyqrj_QV9Xh5Fs&adtonosListenerId=01J1FQS67TMG5E76Z1EP5NPNQ6&aw_0_req_lsid=0be3bccb712a1e0d7321dfa7addcaf7f&an-uid=1809878005412465723&dot-uid=0a90220400b5f4ced2e3aac8&triton-uid=cookie:36c162ac-572a-4f2c-a8d8-26902fe8e60c&amb-uid=7562', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1186, 'devotional', 'Murugan', 'https://stream.zenolive.com/0r7u1fcn8mruv.aac', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1187, 'devotional', 'Shiva Kavasam', 'https://stream-176.zeno.fm/qegsxyzblg6tv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJxZWdzeHl6YmxnNnR2IiwiaG9zdCI6InN0cmVhbS0xNzYuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IllRZEtwcVJrUlFTaW1BT2E0UmQ1bmciLCJpYXQiOjE3Mjg1Nzk4NDgsImV4cCI6MTcyODU3OTkwOH0.T8CNHDIN_DONqSLMj0CE0hQuUGUH0bPHDWFbvN5dnAA&adtonosListenerId=01J1FQS67TMG5E76Z1EP5NPNQ6&aw_0_req_lsid=0be3bccb712a1e0d7321dfa7addcaf7f&an-uid=1809878005412465723&dot-uid=0a90220400b5f4ced2e3aac8&triton-uid=cookie:36c162ac-572a-4f2c-a8d8-26902fe8e60c&amb-uid=7562', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1188, 'devotional', 'Om Radio', 'https://18423.live.streamtheworld.com/OMRADIO_S01AAC_SC', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1189, 'devotional', 'Malayalam ', 'https://stream-158.zeno.fm/w9kku8utuy8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ3OWtrdTh1dHV5OHV2IiwiaG9zdCI6InN0cmVhbS0xNTguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IlJDZTZ0WVhMUjVDc1NCOTJ4dTNtS3ciLCJpYXQiOjE3Mjg0OTA5MzQsImV4cCI6MTcyODQ5MDk5NH0.VvItDIhMc0_9qhFvxfM2sxG3ee03ijsjesFIYKZNRsU&aw_0_req_lsid=0be3bccb712a1e0d7321dfa7addcaf7f&an-uid=1809878005412465723&dot-uid=0a90220400b5f4ced2e3aac8&triton-uid=cookie:36c162ac-572a-4f2c-a8d8-26902fe8e60c&amb-uid=7562584700509988129&dbm-uid=CAESEPybnu_4rWCEA7i8w', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100),
(1190, 'devotional', 'Bhag. Gita (Mal)', 'https://stream-158.zeno.fm/w9kku8utuy8uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ3OWtrdTh1dHV5OHV2IiwiaG9zdCI6InN0cmVhbS0xNTguemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IlJDZTZ0WVhMUjVDc1NCOTJ4dTNtS3ciLCJpYXQiOjE3Mjg0OTA5MzQsImV4cCI6MTcyODQ5MDk5NH0.VvItDIhMc0_9qhFvxfM2sxG3ee03ijsjesFIYKZNRsU&aw_0_req_lsid=0be3bccb712a1e0d7321dfa7addcaf7f&an-uid=1809878005412465723&dot-uid=0a90220400b5f4ced2e3aac8&triton-uid=cookie:36c162ac-572a-4f2c-a8d8-26902fe8e60c&amb-uid=7562584700509988129&dbm-uid=CAESEPybnu_4rWCEA7i8w', '', '', 'Mumbai', 'Devotional Radio', 100, 'y', 100);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `radio`
--
ALTER TABLE `radio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `radio`
--
ALTER TABLE `radio`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1191;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
