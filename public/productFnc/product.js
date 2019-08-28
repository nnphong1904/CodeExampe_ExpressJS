var nextFunction=function(){
        var previousBtn=document.getElementById('previous-btn');
                previousBtn.classList.remove('disabled');
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

var previousFunction=function(){
        var nextBtn=document.getElementById('next-btn');
          nextBtn.classList.remove('disabled');
        var paginationBtn=document.querySelectorAll('#pagination-btn');
        paginationBtn.forEach(function(item){
                item.removeAttribute('style');
                item.textContent=(parseInt(item.textContent)-3).toString();
                item.setAttribute('href','/product?page='+item.textContent);
                
                if (parseInt(item.textContent)===1)
                {
                        var previousBtn=document.getElementById('previous-btn');
                        previousBtn.classList.add('disabled');
                }
        });
}