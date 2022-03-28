# Software Studio 2020 Spring Midterm Project

## Topic
* Project Name : Mid-Chatroom
* Key functions
    1. 登入/註冊：可以用以存在於系統中的帳號來登入聊天室，或是創建新帳號。另外，也可以選擇使用Google帳號登入的方式進入聊天室。
    2. 私人聊天室：在頁面中可以看到目前自己所有的聊天室。可以創建新的聊天室，加入成員，也能自由地在現存的聊天室中加入新的成員。進入了一個聊天室後，可以看到目前的成員，還有所有歷史訊息。
    3. 公共聊天室：所有註冊過及Google登入進的人們都能夠進入公開聊天室一起聊天。
    4. 登出：離開系統。
    5. 安全性功能：如果使用者輸入了奇怪的東西或是不正確、會造成錯誤的內容，會做處理。
    6. Chrome Notification：在私人或是公共聊天室都有通知功能，第一次進入聊天室時會要求允許通知，之後別人傳訊息來都能夠收到通知。
    7. CSS Animation：適度添加一些css的動畫效果，讓畫面比較不無聊：）

    
* Other functions
    1.  特殊符號：在聊天室中內建兩種特殊符號---愛心、寶寶的臉，可以讓使用者自由使用。
    2.  訊息傳送時間：每則訊息都會記錄傳送時間，顯示在訊息旁邊。
    
## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|15%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|20%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description
> 進入畫面
> 
![](https://i.imgur.com/N47jE6E.png)

* 一點開聊天室網頁會看到的畫面。歡迎大家一起輕鬆使用～
* 點擊ENTER即可進入。


> **登入畫面**
> 
![](https://i.imgur.com/M2atQjC.png)

* 可以在這裡選擇用email登入、Google帳號登入或是註冊新帳號。
* 若要註冊帳號，會跳轉到註冊畫面。

> **註冊畫面**
> 
![](https://i.imgur.com/cWgq1WF.png)

* 使用email來註冊，並設定自己的使用者名稱，以後都會以這個名稱在聊天室內活動。
* 點下submit按鈕就註冊成功了！並會跳轉回登入頁面。


> **Ｍenu**
> 
![](https://i.imgur.com/tZK0d11.png)



* 登入成功後，會進到這個選擇畫面，不過這個畫面只有剛登入後會出現，可以選擇要前往的頁面或登出，由左至右分別是私人聊天室頁面、公共聊天室或是要登出。
* 把滑鼠游標移到按鈕上會有很酷的動畫！像是這樣：

![](https://i.imgur.com/NwsLIW5.png)

 

> **私人聊天室**
> 
![](https://i.imgur.com/u1H2nPX.png)

* 要點開聊天室才會呈現這樣的畫面，沒有進入任何聊天室的話，member和訊息欄位都會是空白的。
* 左上角顯示使用者目前所有的聊天室。按加號可以新增成員（roomname現有的）或是創建新的聊天室。創建的畫面如下圖：

![](https://i.imgur.com/6olMv1K.png)


* 左下角顯示目前進入的聊天室內的成員。
* 主要的大區塊顯示聊天訊息對話框，還有可以傳送新的訊息、按表情符號等等。
* 每則訊息都會顯示傳送者的名稱和傳送時間。
* 上方的nav bar，按public room可以進到公共聊天室，右邊有登出按鈕，以及如果你有很多帳號，但是忘記現在是用哪支帳號的話，可以點人像的圖案確認。

> **公共聊天室**
> 
![](https://i.imgur.com/15PKaUs.png)

* 公共聊天室的畫面和私人的很相似，但因爲只是一個大聊天室所以只有訊息的區塊。能夠和所有有註冊過的人一起聊天！
* 上方的nav bar，按public room可以進到公共聊天室，右邊有登出按鈕，以及如果你有很多帳號，但是忘記現在是用哪支帳號的話，可以點人像的圖案確認。



### 作品網址：https://mid-chatroom.web.app

# Components Description : 
1. Membership Mechanism	（登入/註冊）: 主要使用email登入及註冊功能，並且也實作了Third-Party Sign In，使用者可以用Google帳號登入。
   
2. Database : 在註冊時，或是用Google帳號登入時，會將使用者相關資訊（email、username）以username作為key存放到database中，之後也會存放使用者擁有的聊天室，以及使用者現在在哪個私人聊天室中（點開哪個聊天室）。除此之外，分別紀錄各個聊天室內的訊息，還有公共聊天室的訊息。
3. RWD : 當畫面逐漸縮小會有不同的版面，如上方的nav bar會將按鈕都隱藏到單一按鈕下，按下選項按鈕才會跳出。如下圖：

   ![](https://i.imgur.com/1Dzk77k.png)
   ![](https://i.imgur.com/58qBMIs.png)



   在私人聊天室頁面的各個區塊大小也會變化，縮到更小時它們會呈垂直排列。如下圖：
   
   ![](https://i.imgur.com/V2NcPNl.png)
   
   
4. Chat room：主要的聊天功能，隨時顯示最新訊息和歷史訊息，並同時顯示訊息的傳送人和傳送時間。
5.  Chrome notification：當停留在某聊天室中，有別人傳送訊息來時，會顯示Chrome通知，如下圖。

   ![](https://i.imgur.com/sHlfOxK.png)

6. CSS animation：某些按鈕做了css動畫特效，例如一進入聊天室的enter大按鈕，menu的按鈕，還有nav bar中的登出按鈕。


# Other Functions Description : 


1. 特殊符號 : 就像是 Facebook messenger的讚，或是Instagram的愛心功能，只要點擊文字框旁的兩個圖案，就可以傳送可愛的符號給別人。
![](https://i.imgur.com/SBPF1t2.png)


## Security Report

* 有做避免使用者輸HTML會產生錯誤的處理。

![](https://i.imgur.com/Z3C9gZt.png)


* 若是在註冊時輸入的名稱已經被別人使用的話，會跳警告，必須換一個名稱。

![](https://i.imgur.com/p50X71J.png)

* 還有若是使用者在加入聊天室成員時，所輸入的名稱並不存在的話則無法加入。

![](https://i.imgur.com/RNTkW9H.png)


---


