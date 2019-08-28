var nextFunction=function(){
   var paginationBtn=document.querySelectorAll('#pagination-btn');
        paginationBtn.forEach(function(item){
           item.textContent=(parseInt(item.textContent)+3).toString();
           item.setAttribute('href','/product?page='+item.textContent);
            if (parseInt(item.textContent)===13)
            {
                var nextBtn=document.getElementById('next-btn');
                nextBtn.classList.add('disabled');
            }
           if ((parseInt(item.textContent))>13){
                 item.setAttribute('style','display:none');
            }
        });     
}