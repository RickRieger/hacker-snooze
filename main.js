
const parent = document.querySelector('#news');
document.querySelector('#dude').addEventListener('click', getNews);





function getNews(){
    
    const URL = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
    
    fetch(URL)
    
    .then((result) => result.json())
    
    .then((data) => {
        
        console.log(data);
        
        for(const id of data){
            let URL2 = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
            fetch(URL2)
            
            .then((result) => result.json())
            
            .then((data) => {
                
                console.log(data)
                
                const div = document.createElement('div');
                const div2 = document.createElement('div');
                div.className = "newsTitle";
                const aTag = document.createElement('a');
                aTag.className = "news-aTag";
                aTag.innerText = data.title;
                aTag.href = data.url;
                const score = document.createElement('span');
                score.className = "score";
                score.innerText = `${data.score} points by `
                const author = document.createElement('a');
                author.className = "authors"
                author.href = "#";
                author.innerText = `${data.by}. `;
                const comments = document.createElement('a');
                comments.className = "comments";
                comments.id = data.id;
                comments.href = "#";
                comments.addEventListener("click", function(){ 
                    
                    let URL2= `https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`
                    
                    fetch(URL2)
                    
                    .then((result) => result.json())
                    
                    .then((data) => {
                        
                        let commentSection = data.kids;
                        
                        for (const comment of commentSection){
                            
                            let URL3= `https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`
                            
                            fetch(URL3)
                            
                            .then((result) => result.json())
                            
                            .then((data) => {
                                console.log(data)
                                const newDiv = document.createElement('div');
                                const pTag = document.createElement('p');
                                pTag.innerText = data.text;
                                newDiv.appendChild(pTag);
                                this.insertAdjacentElement('afterend', newDiv);
                                
                                
                            })
                            
                        }
                        
                    })
                    
                    
                    
                });
                
                
                const pointsBy = document.createElement('span');
                if(data.kids === undefined){
                    comments.innerText = '0 comments.';
                }
                else if (data.kids !== undefined){
                    comments.innerText = `${data.kids.length} comments.`;
                }
                
                // subheader.innerText = `${score} points by ${author}. ${comments} comments.`;
                // div.appendChild(subheader);
                div.appendChild(aTag);
                div2.appendChild(score);
                div2.appendChild(author);
                div2.appendChild(comments);
                parent.appendChild(div);
                parent.appendChild(div2);

            })
            
        }
        
    })
}

