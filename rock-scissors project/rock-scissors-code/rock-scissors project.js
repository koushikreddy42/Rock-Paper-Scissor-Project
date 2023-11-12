const score = JSON.parse(localStorage.getItem('score')) || {wins:0,
    loses:0,ties:0};

    updateScore();
    document.querySelector('.rock-button').addEventListener("click",()=>
    {
        playerMove('rock');
    }
    )
    document.querySelector('.paper-button').addEventListener("click",()=>
    {
        playerMove('paper');
    }
    )
    document.querySelector('.scissor-button').addEventListener("click",()=>
    {
        playerMove('scissors');
    }
    )
    document.body.addEventListener("keydown",(event)=>
    {
        if(event.key === 'r')
        playerMove('rock');
        if(event.key === 'p')
        playerMove('paper');
        if(event.key === 's')
        playerMove('scissors');
    }
    )
    function playerMove(playermove)
    {
        let computermove = computerMove();
        let result = '';
        if(playermove==='rock')
        {
            if(computermove==='rock')
            result = 'Tie';
            else if(computermove==='paper')
            result = 'You lose';
            else if(computermove==='scissors')
            result = 'You win';
        }
        if(playermove==='paper')
        {
            if(computermove==='rock')
            result = 'You win';
            else if(computermove==='paper')
            result = 'Tie';
            else if(computermove==='scissors')
            result = 'You lose';
        }
        if(playermove==='scissors')
        {
            if(computermove==='rock')
            result = 'You lose';
            else if(computermove==='paper')
            result = 'You win';
            else if(computermove==='scissors')
            result = 'Tie';
        }
        
        if(result==='You win')
        score.wins++;
        else if(result==='You lose')
        score.loses++;
        else
        score.ties++;
        localStorage.setItem('score',JSON.stringify(score));

        updateScore();

        document.querySelector('.Result').innerHTML = `${result}`;
        document.querySelector('.Moves').innerHTML = `You <img class="image-class" src="../rock-scissors-pictures/${playermove}-emoji.png"> <img class="image-class" src="../rock-scissors-pictures/${computermove}-emoji.png"> Computer`;
    }

    function computerMove()
    {
        let move = Math.random();
        let computermove = '';
        if(move<1/3)
        computermove = 'rock';
        else if(move<2/3)
        computermove = 'paper';
        else
        computermove = 'scissors';
        return computermove;
    }
    let intervalID;
    function autoPlay()
    {
        let ele = document.querySelector('.autoplay-button-class');
        let ele_text = ele.innerHTML;
        if(ele_text === 'Auto Play')
        {
            intervalID = setInterval(
                function()
                {
                    let computermove = computerMove();
                    playerMove(computermove);
                }, 1000
            );
            ele.innerHTML = 'Stop Play';
        }
        else
        {
            clearInterval(intervalID);
            ele.innerHTML = 'Auto Play';
        }
    }

    function updateScore()
    {
        document.querySelector('.Score').innerHTML = `Wins:${score.wins}, Loses:${score.loses}, Ties:${score.ties}`
    }

