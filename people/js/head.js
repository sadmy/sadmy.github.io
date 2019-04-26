$(function(){
	var index=0
	$("#main .content").eq(0).show().siblings().hide();
	$('.header-tap-ul li').click(function(e){
		// console.log(1)
		$(this).addClass("active").siblings().removeClass("active");
		 index =$(this).index();
		var flag 
		if (index==0||index==1 ) {
			$("#bg").show()
			$("#bg .earth").toggleClass('animate');
				
			
		}else{
		$("#bg").hide();	
		}
		if (index==1 ) {
		$("#bg div.yuanhome").addClass('xianshi');	
		}else{
			$("#bg div.yuanhome").removeClass('xianshi');
		}
		
		$("#main .content").eq(index).show().siblings().hide();
		if ($(e.target).attr("class")=="header-tap-item") {
			console.log(1)
			var index1 = $(e.target).index();
			$("#main .content").eq(index).children().eq(index1+1).show().siblings().hide();
			if (index == 3) {
				$("#main .content").eq(index).find("li").eq(index1).show().siblings().hide();
			}
			console.log($("#main .content").eq(index).children().eq(index1+1));
		}
	})
	
})