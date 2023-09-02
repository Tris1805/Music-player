const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)


const player_store_key = 'Player'
const listMusic = $('.list-music')
const cd = $('.music_player-image')
const heading = $('header h3')
const CDThumb = $('.music_player-image-item')
const audio = $('audio')
const btnPlay = $('.btn-play-item')
const TimeLine = $('.music_player_time-line-item')
const Time_start = $('.music_player_time-start')
const Time_end = $('.music_player_time-end')
const NextBtn =$('.next-btn')
const PrevBtn = $(".prev-btn")
const BtnRandom = $('.random-btn')
const BtnRepeat = $('.repeat-btn')
const volumup = $('.volum-up')
const volumdown = $('.volum-down')

const  app = {
    currentIndex: 0,
    isPlaying: false,
    RandomMusics: false,
    RepeatMusics: false,
    currentVolume: .5,
    config: JSON.parse(localStorage.getItem(player_store_key)) || {},
    setConfig: function(key, value) {
        this.config[key] = value,
        localStorage.setItem(player_store_key, JSON.stringify(this.config))
    },
    SongMusis:[
        {
            "id": 1,
            "name": "Cupid",
            "singer": "FIFTY FIFTY",
            "img":  "./assets/img/cupid.jpg",
            "song": "./assets/songs/cupid.mp3"    
        },
        {
            "id": 2,
            "name": "Flower",
            "singer": "Jisoo",
            "img":  "./assets/img/flower.jpg",
            "song": "./assets/songs/flower.mp3"    
        },
        {
            "id": 3,
            "name": "Cánh đồng yêu thương",
            "singer": "Trung Quân",
            "img":  "./assets/img/cdyt.jpg",
            "song": "./assets/songs/cdyt.mp3"    
        },
        {
            "id": 4,
            "name": "Usagi Flap",
            "singer": "ブルーアーカイブ ",
            "img":  "./assets/img/usagi.jpg",
            "song": "./assets/songs/usagi-flap.mp3"   
        }
    ],
    defineProperties: function (){
        Object.defineProperty(this,"currentSong",{
            get:function(){
                return this.SongMusis[this.currentIndex]
            }
        })
    },
    render:function(){
        const html = this.SongMusis.map((song,index) =>{
            return `
            <div class="list-music-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <img src="${song.img}" alt="" class="list-music-item-img">
                <div class="list-music-item-title">
                    <span class="list-music-item-name">${song.name}</span>
                    <span class="list-music-item-author">${song.singer}</span>
                </div>
                <i class="fas fa-ellipsis-vertical list-music-item-icon"></i>
                </div>
            `
        })
        listMusic.innerHTML = html.join('')
    },
    LoadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        CDThumb.src = this.currentSong.img
        audio.src = this.currentSong.song
        audio.volume = this.currentVolume
    },
    handleEvents: function (){
        const _this =  this;
        //Xử lý cd xoay
        const CDThumbAnimate = CDThumb.animate([
            { transform: "rotate(360deg)"}
        ],{
            duration: 10000,
            iterations: Infinity 
        }
        )
        CDThumbAnimate.pause()
        btnPlay.onclick = function() {
            console.log(_this.isPlaying)
            if(_this.isPlaying){
                audio.pause()
            }else {
                audio.play()
            }
            
        }
        audio.onplay = () => {
            _this.isPlaying = true
            btnPlay.classList.add('play')
            
            CDThumbAnimate.play()
        }
        audio.onpause = () => {
            _this.isPlaying = false
            btnPlay.classList.remove('play')
            CDThumbAnimate.pause()

        }
        audio.ontimeupdate = () => {
            if  (audio.duration){
                const progress = Math.floor(audio.currentTime / audio.duration * 100)
                TimeLine.value = progress
            }
        }
        //xử lý tua
        TimeLine.onchange = (e) => {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        //NextSong
        NextBtn.onclick = () => {
            if(_this.RandomMusics){
                _this.randomSong()
            }else{
                _this.nextSong()
            }
            audio.play()   
            _this.render() 
            _this.scrollToActiveSong()
        }
        //PrevSong
        PrevBtn.onclick = () => {
            if(_this.RandomMusics){
                _this.randomSong()
            }else{
                _this.prevSong()
            }
           
            audio.play()    
            _this.render() 
            _this.scrollToActiveSong()
        }
        //RandomSong
        BtnRandom.onclick = (e) => {
            _this.RandomMusics = !_this.RandomMusics
            _this.setConfig("RandomMusics", _this.RandomMusics)
            e.target.classList.toggle('active', _this.RandomMusics)
        }
        //NextSongWhenEnded
        audio.onended = () => {
            if(_this.RepeatMusics){
                audio.play()
            }else{
                NextBtn.click()
            }
        }
        //RepeatSong
        BtnRepeat.onclick = (e) => {
            _this.RepeatMusics =!_this.RepeatMusics
            _this.setConfig("RepeatMusics", _this.RepeatMusics)
            e.target.classList.toggle('active', _this.RepeatMusics)
            this.render()
        }
        listMusic.onclick = (e) => {
            const songNode = e.target.closest('.list-music-item:not(.active)')
            if  ( songNode || e.target.closest('.list-music-item-icon')){
                if ( songNode ){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.LoadCurrentSong()
                    audio.play()
                    _this.render() 
                    _this.scrollToActiveSong()
                }
            }
            
        }

        //VolumUp
        const volumeSlider = document.getElementById('volume-slider');
        const volumeLabel = document.getElementById('volume-label');
        volumup.onclick = () => {
            let volumeValue = parseFloat(audio.volume).toFixed(2);
            if (volumeValue < 1.00) {
                audio.volume = parseFloat(volumeValue) + 0.05;
                volumeSlider.value = parseFloat(audio.volume * 100).toFixed(2);
                volumeSlider.style.display = 'flex';
                volumeLabel.textContent = `Âm Lượng: ${volumeSlider.value}%`;
            }
        }

        volumeSlider.onchange = function() {
            const volumeValue = volumeSlider.value;
            // console.log(volumeSlider.value)
            newVolume = parseFloat(volumeValue) / 100
            audio.volume = (parseFloat(volumeValue) / 100).toFixed(2);
            // console.log(audio.volume)

            volumeLabel.textContent = `Âm Lượng: ${volumeValue}%`;
            // Tại đây, bạn có thể thực hiện hành động cụ thể khi âm lượng thay đổi, ví dụ: điều khiển âm lượng âm thanh thực tế.
        };
        //VolumDown
        volumdown.onclick = () => {
            let volumeValue = parseFloat(audio.volume).toFixed(2);
            if (volumeValue >= 0) {
                audio.volume = parseFloat(volumeValue) - 0.05;
                volumeSlider.value = parseFloat(audio.volume * 100).toFixed(2);
                volumeLabel.textContent = `Âm Lượng: ${volumeSlider.value}%`;
            }
        }
        const totalTimeSpan = document.getElementById('totalTime');
        audio.addEventListener('loadedmetadata', () => {
            const totalTime = _this.formatTime(audio.duration);
            totalTimeSpan.textContent = totalTime;
        });
        const currentTimeSpan = document.getElementById('currentTime');
        audio.addEventListener('timeupdate', () => {
            const currentTime = _this.formatTime(audio.currentTime);
            currentTimeSpan.textContent = currentTime;
        });
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            NextBtn.click();
        });
    },
    
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.SongMusis.length){
            this.currentIndex = 0
        }
        this.LoadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex <  0 ){
            this.currentIndex = this.SongMusis.length - 1
        }
        this.LoadCurrentSong()
    },
    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.SongMusis.length)

        }while(newIndex ===  this.currentIndex)
        this.currentIndex = newIndex
        this.LoadCurrentSong()
    },
    loadConfig: function(){
        this.RandomMusics = this.config.RandomMusics
        this.RepeatMusics = this.config.RepeatMusics

    },
    scrollToActiveSong: function(){
        setInterval(() =>{
            $('.list-music-item.active').scrollIntoView({
                behavior:'smooth', 
                block:  "center"
            }, 300)
        })
    },
    formatTime: (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    start:function(){
        this.defineProperties()
        this.LoadCurrentSong()
        this.loadConfig()
        this.render()
        this.handleEvents()
        BtnRandom.classList.toggle('active', this.BtnRandom)
        BtnRepeat.classList.toggle('active', this.RepeatMusics)
    }
}
app.start();
