// Proxy

interface Video {
    id: number;
    name: string;
    size: number;
}

interface ThirdPartyYouTubeLib {
    getVideoList(): Array<Video>;
    getVideoInfo(id: number): Video;
    downloadVideo(id: number): Video;
}

class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    private videoList: Array<Video>;

    constructor(videoList: Array<Video>) {
        this.videoList = videoList;
    }

    public getVideoList(): Array<Video> {
        return this.videoList;
    }

    public getVideoInfo(id: number): Video {
        const video = this.videoList.find(v => v.id === id);
        return video;
    }

    public downloadVideo(id: number): Video {
        const video = this.videoList.find(v => v.id === id);
        return video;
    }
}

class CachedYouTubeClass implements ThirdPartyYouTubeLib {
    private service: ThirdPartyYouTubeLib;
    private cachedVideoList: Array<Video>;
    private cachedDownloadVideos: Array<Video>;

    constructor(service: ThirdPartyYouTubeLib) {
        this.service = service;
        this.cachedVideoList = [];
        this.cachedDownloadVideos = [];
    }

    public getVideoList(): Array<Video> {
        if (!this.cachedVideoList || !this.cachedVideoList.length) {
            this.cachedVideoList = this.service.getVideoList();
        }
        return this.cachedVideoList;
    }

    public getVideoInfo(id: number): Video {
        if (!this.cachedVideoList || !this.cachedVideoList.length) {
            this.getVideoList();
        }

        const video = this.service.getVideoInfo(id);
        return video;
    }

    public downloadVideo(id: number): Video {
        console.log('[this.cachedDownloadVideos]', this.cachedDownloadVideos);

        const targetVideo = this.getVideoInfo(id);
        const cachedDownloadVideo = this.cachedDownloadVideos.find(v => v.id === targetVideo.id);
        if (cachedDownloadVideo) {
            return cachedDownloadVideo;
        }

        this.cachedDownloadVideos.push(targetVideo);
        return targetVideo;
    }
}

const youTubeClass = new ThirdPartyYouTubeClass([{
    id: 1,
    name: '안녕하십니까 행님덜',
    size: 10,
}, {
    id: 2,
    name: '야쿠르트 50 줄 푸파',
    size: 30,
}, {
    id: 3,
    name: '인사 오지게 박습니다!',
    size: 20,
}]);
const youTubeProxy = new CachedYouTubeClass(youTubeClass);

const foodVideo = youTubeProxy.getVideoInfo(2);
console.log('[foodVideo]', foodVideo);

console.log('[----- download first time -----]');
const downloadFoodVideoFirstTime = youTubeProxy.downloadVideo(2);
console.log('[downloadFoodVideoFirstTime]', downloadFoodVideoFirstTime);

console.log('[----- download second time -----]');
const downloadFoodVideoSecondTime = youTubeProxy.downloadVideo(2);
console.log('[downloadFoodVideoSecondTime]', downloadFoodVideoSecondTime);

console.log('[----- download third time -----]');
const downloadFoodVideoThirdTime = youTubeProxy.downloadVideo(2);
console.log('[downloadFoodVideoThirdTime]', downloadFoodVideoThirdTime);


