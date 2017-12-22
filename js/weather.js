// 获取一级城市
var date;
$.ajax({
	url:"http://api.jisuapi.com/weather/city?appkey=2ff038a58e51aa42",
	dataType:"Jsonp",
	success:function(val){
		date = val.result;
		var province = $.grep(date,function(val,index){
			return val.parentid == 0;
		})
		// console.log(province);
		$.each($(".province li"),function(index,val){
			$(val).html(province[index].city);
			$(val).attr("provinceid",province[index].cityid);
		})
	}
});

// 获取二级地区
$(".province li").each(function(index,ele){
	$(ele).click(function(){
		$(".province li").removeClass("select");
		// 状态消失
		$(".area").html("");
		// 二级城市消失
		
		$(ele).addClass("select");
		var city = $.grep(date,function(val,index){
			return val.parentid == $(ele).attr("provinceid");
		})
		$.each(city,function(indext,val){
			var li = $("<li></li>");
			li.html(val.city);
			$(".area").append(li);
		})
	})
})


$(".area").on("click","li",function(){
	getFullWeather($(this).html());
})

$.getScript
("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
	getFullWeather(remote_ip_info.city)
});


var weatherObj;
function getFullWeather(city){
	$(".now-city").html(city);
	$.ajax({
		url:"http://api.jisuapi.com/weather/query?appkey=7ee58d022acf619f&city=" + city,
		dataType:"jsonp",
		success:function(val){
			weatherObj = val.result;
			$(".now-state span").html(weatherObj.temp+"°");
			$(".now-state .weather").html(weatherObj.weather);
			$(".now-state .tmps").html(weatherObj.temphigh+"° ~"+weatherObj.templow+"°");
			$(".now-state img").attr("src","img1/"+weatherObj.img+".png");

			//未来几小时
			$(".hourly ul li").each(function (index, ele) {
			    $(ele).find("time").html(weatherObj.hourly[index].time);
			    $(ele).find("img").attr("src", "img1/" + weatherObj.hourly[index].img + ".png");
			    $(ele).find("p").html(weatherObj.hourly[index].temp + "°");
			});

			//未来几天
			$(".week li").each(function (index, ele) {
			    $(ele).find("time").html( weatherObj.daily[index + 1].week);
			    $(ele).find("img").attr("src", "img1/" + weatherObj.daily[index + 1].day.img + ".png");
			    $(ele).find("p").html(weatherObj.daily[index + 1].day.temphigh + "°/" + weatherObj.daily[index + 1].night.templow + "°")
			});
		}
	})
}



