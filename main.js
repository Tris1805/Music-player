const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

const player_store_key = 'Player'
const listMusic = $('.list-music')
const cd = $('.music_player-image')
const heading = $('header h3')
const CDThumd = $('.music_player-image-item')
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
    currentIndex:0,
    IsPlaying:false,
    RandomMusics: false,
    RepeatMusics: false,
    config:JSON.parse(localStorage.getItem(player_store_key)) || {},
    setconfig:function(key, value){
            this.config[key] = value
            localStorage.setItem(player_store_key, JSON.stringify(this.config))
    },
    SongMusis:[
        {
            name:'Bên nhau thật khó remix',
            singer:'Châu Khải Phong & Khang Việt',
            path:'./assets/music/song1.mp3',
            image:'./assets/image/1.jpg'
        },
        {
            name:'Thất Tình remix',
            singer:'Trịnh Đình Quang',
            path:'./assets/music/song2.mp3',
            image:'./assets/image/2.jpg'
        },
        {
            name:'Nhạc sàn remix cực hay',
            singer:'TikTok',
            path:'./assets/music/song3.mp3',
            image:'./assets/image/3.jpg'
        },
        {
            name:'Nếu em không gặp may remix',
            singer:'Cao Tùng Huy',
            path:'./assets/music/song4.mp3',
            image:'./assets/image/4.jpg'
        },
        {
            name:'Cô đơn dành cho ai remix',
            singer:'LEEKEN x NAL',
            path:'./assets/music/song5.mp3',
            image:'./assets/image/5.jpg'
        },
        {
            name:'Chạnh lòng thương cô remix',
            singer:'Huy Vạc',
            path:'./assets/music/song6.mp3',
            image:'./assets/image/6.jpg'
        },
        {
            name:'Cô độc vương remix',
            singer:'Thái Quỳnh',
            path:'./assets/music/song7.mp3',
            image:'./assets/image/7.jpg'
        },
        {
            name:'Khóc cho người ai khóc cho anh remix',
            singer:'Gia Huy',
            path:'./assets/music/song8.mp3',
            image:'./assets/image/8.jpg'
        },
        {
            name:'Như bến đợi đò remix',
            singer:'Hana Cẩm Tiên & Khánh Ân',
            path:'./assets/music/song9.mp3',
            image:'./assets/image/9.jpg'
        },
        {
            name:'Câu hứa chưa vẹn tròn remix',
            singer:'Phát Huy',
            path:'./assets/music/song10.mp3',
            image:'./assets/image/10.jpg'
        },
        {
            name:'Như một người dưng remix',
            singer:'Nguyễn Thạc Bảo Ngọc',
            path:'./assets/music/song11.mp3',
            image:'./assets/image/11.jpg'
        },
        {
            name:'Không bằng remix',
            singer:'Na',
            path:'./assets/music/song12.mp3',
            image:'./assets/image/12.jpg'
        },
        {
            name:'Chỉ là ta đã từng yêu remix',
            singer:'Thiên Tú',
            path:'./assets/music/song13.mp3',
            image:'./assets/image/13.jpg'
        },
        {
            name:'Cô gái vàng remix',
            singer:'HuyR x Tùng Viu x Quang Đăng',
            path:'./assets/music/song14.mp3',
            image:'./assets/image/14.jpg'
        },
        {
            name:'Anh không tha thứ remix',
            singer:'Đình Dũng',
            path:'./assets/music/song15.mp3',
            image:'./assets/image/15.jpg'
        }
    ],
    defineProperties: function (){
        Object.defineProperty(this,"baihat",{
            get:function(){
                return this.SongMusis[this.currentIndex]
            }
        })
    },
    render:function(){
        const html = this.SongMusis.map((song,index) =>{
            return `
            <div class="list-music-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <img src="${song.image}" alt="" class="list-music-item-img">
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
    EventSColl:function(){
        const cdWidth = cd.offsetWidth;
        // const ListHeigth = listMusic.offsetHeight;
        document.onscroll =function(){
            const ScrollTop = window.scrollY || document.documentElement.scrollTop;
            const NewCdWidth = cdWidth - ScrollTop
            // const NewHeigth = ListHeigth + ScrollTop
            cd.style.width = NewCdWidth  > 0  ? NewCdWidth + "px" : 0 ; 
            cd.style.opacity =   NewCdWidth / cdWidth
            // ListHeigth.style.height = NewHeigth  > 0  ? NewHeigth + "px" : 0 ; 
        }
    },
    LoadCurrentSong: function(){
        heading.textContent = this.baihat.name
        CDThumd.src = this.baihat.image
        audio.src = this.baihat.path
    },
    NextSong:function(){
        this.currentIndex++
        if(this.currentIndex >= this.SongMusis.length){
            this.currentIndex = 0
        }
        this.LoadCurrentSong()
    },
    PrevSong:function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.SongMusis.length
        }
        this.LoadCurrentSong()
    },
    PlayRandomMusic:function(){
        let newRanDom
        do
            newRanDom = Math.floor(Math.random() * this.SongMusis.length)
        while(newRanDom === this.currentIndex)
        this.currentIndex = newRanDom
        console.log(this.currentIndex)
        this.LoadCurrentSong()
    },
    RenderScrollSong:function(){
        setTimeout(() => {
            const item_music = $('.list-music-item.active')
            item_music.scrollIntoView({
                behavior:'smooth',
                block:'center'
            })
        },500);
    },
    DisplayTimeNumber:function(currentTime,duration){
        if (!currentTime || !duration) {
        Time_start.innerText = '00:00:00';
        Time_end.innerText = '00:00:00';
        return;
    }

    const formatTime = function(time) {
        return time < 10 ? '0' + time : time;
    }

    const hoursDuration = Math.floor(duration / 3600);
    const minutesDuration = Math.floor((duration % 3600) / 60);
    const secondsDuration = Math.floor(duration % 60);

    const hoursCurrent = Math.floor(currentTime / 3600);
    const minutesCurrent = Math.floor((currentTime % 3600) / 60);
    const secondsCurrent = Math.floor(currentTime % 60);

    Time_end.innerText = `${formatTime(hoursDuration)}:${formatTime(minutesDuration)}:${formatTime(secondsDuration)}`;
    Time_start.innerText = `${formatTime(hoursCurrent)}:${formatTime(minutesCurrent)}:${formatTime(secondsCurrent)}`;
    },
    HanldEvent:function(){
        const _this = this
        // xử lsy CD quay/dừng
        const CDThumdAnimate = CDThumd.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration:10000,
            iterations:Infinity
        })
        CDThumdAnimate.pause()
        //xử lý khi click btnPlay
        btnPlay.onclick = function(){
            if(_this.IsPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        // khi Song được Play
        audio.onplay = function(){
            _this.IsPlaying = true
            btnPlay.classList.add('play')
            CDThumdAnimate.play()
        }
        // Khi Song được Pause
        audio.onpause = function(){
            _this.IsPlaying = false,
            btnPlay.classList.remove('play')
            CDThumdAnimate.pause()
        }
        // Khi thời gian chạy của bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const timelinePercent = Math.floor(audio.currentTime / audio.duration * 100)
                TimeLine.value = timelinePercent
                _this.DisplayTimeNumber(audio.currentTime, audio.duration)
            }
        }
        // Xử lý khi tua bài hát
        TimeLine.oninput = function(e){
            const TimeOnchange = audio.duration / 100 * e.target.value
            audio.currentTime = TimeOnchange
        }
        // Xử lý khi next bài hát
        NextBtn.onclick = function(){
            if(_this.RandomMusics){
                _this.PlayRandomMusic()
                _this.RenderScrollSong()
                _this.render()
            }else{
                _this.NextSong()
                _this.RenderScrollSong()
                _this.render()
            }
            audio.play()
        }
        // Xử lý khi prev bài hát
        PrevBtn.onclick = function(){
            if(_this.RandomMusics){
                _this.PlayRandomMusic()
                _this.RenderScrollSong()
                _this.render()
            }else{
                _this.PrevSong()
                _this.RenderScrollSong()
                _this.render()
            }
            audio.play()
        }
        //  xử lý khi random được bật/tắt
        BtnRandom.onclick = function(){
            _this.RandomMusics = !_this.RandomMusics
            _this.setconfig("RandomMusics",_this.RandomMusics)
            BtnRandom.classList.toggle("active",_this.RandomMusics)
        }
        // Xử lý khi tải lại bài hát
        BtnRepeat.onclick= function(){
            _this.RepeatMusics = !_this.RepeatMusics
            _this.setconfig("RepeatMusics",_this.RepeatMusics)
            BtnRepeat.classList.toggle("active",_this.RepeatMusics)
        }
        // xử lý khi bài hát kết thúc tự động next sang bài mới/ load lại bài hát
        audio.onended = function(){
            if(_this.RepeatMusics){
                audio.play()
            }else{
                NextBtn.click()
            }
        }
        // lắng nghe xử lý sự kiện hành vi click vào list musuc
        listMusic.onclick = function(e){
            const songnode = e.target.closest('.list-music-item:not(.active') 
            // xử lý click vào song thì chuyển đến bài đó
            if(songnode|| e.target.closest('.list-music-item-icon')){
                // Xử lý khi click vào song
                if(songnode){
                    _this.currentIndex = Number(songnode.dataset.index)
                    _this.LoadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }

        // xử lý tăng giảm âm lượng
        volumup.addEventListener('click',function(e){
            e.preventDefault()
            if(audio.volume < 1){
                audio.volume += 0.05;
            }else{
                audio.volume = 1
            }
        })
        volumdown.addEventListener('click',function(e){
            e.preventDefault()
            if(audio.volume > 0){
                audio.volume -= 0.05;
            }else{
                audio.volume = 0
            }
        })
       
    }, 
    LoadConfig: function(){
        this.RandomMusics = this.config.RandomMusics
        this.RepeatMusics = this.config.RepeatMusics
    },
    start:function(){
        // gán cấu hình từ config vào ứng dụng
        this.LoadConfig()
        // Xử lý các sự kiện 
        this.HanldEvent()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()
        // Lắng nghe / xử lý các sự kiện (Event DOM)
        this.EventSColl()
        // Tải thông tin bài hát đầu tiên và UI khi chạy ứng dụng
        this.LoadCurrentSong()
        // render lại playlist
        this.render()
        // hiển thị thời gian time line nhạc chạy
        this.DisplayTimeNumber()
        // hiển thị config đã lưu 
        BtnRandom.classList.toggle("active",this.RandomMusics)
        BtnRepeat.classList.toggle("active",this.RepeatMusics)
    }
}
app.start();
