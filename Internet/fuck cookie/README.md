# cookie

cookie，session，token，localStorage，sessionStorage 到底是什么？？？这应该是面试的基本问题了，百度一下各种答案也到处都是，今天彻底搞一搞他们到底是什么

先不去说其他的概念，我们在日常上网的时候，比如打开某一个网站，发个请求什么的都是基于 HTTP 协议，而 HTTP 协议是一种无状态的协议。ok 先知道它无状态就好了，当我们兴致勃勃的打开某一个网站，我们最常见的是什么？？？

应该是下面这样:

![avatar](/assets/images/Internet/cookie/login.png)

没错，就是让你登录。当我们输入完用户名和密码之后向后端发起请求，后端接收到了用户名和密码验证完毕之后通过接口返回给前端一个标志 （true），前端拿到后路由跳转才能看到之后的页面。比如:

![avatar](/assets/images/Internet/cookie/index.png)

截止到目前为止，这是第一次完整的 ajax 请求，目的就是为了让后端知道，我是我在操作！！！！ok，接下来，我开始逛知乎了。。。。。。然后一下午时间没了。。。。。。开个玩笑，接下来，我想看一下知乎上的大佬都是如何解释 cookie 的，于是我在这边输入并且按下了搜索按钮

![avatar](/assets/images/Internet/cookie/search.png)

这时，我们又发起了一次 http 请求，但是 http 是无状态的，这时候新的请求发到后端，后端并不知道我是我，那怎么办？难道还要我再去登录一次？？？ 答案是否定的，这时候 cooike 可以第一次正式的和我们的见面了。<strong>cookie 最初是在客户端用于存储会话信息的</strong>，这时候，我们把我们的用户名和密码都放在 cookie 里，然后放到请求头里面，服务端拿到后再去读取用户名和密码就好了。(如果用户名和密码都经过加密，理论上还是很安全的)

好的 在 session 出来之前，大部分的网站都是采用 cookie 的方式来进行状态保持的，那为什么还要搞出来 session 呢？因为如下：

-   1.全部在客户端保存，服务端无法验证，这样伪造和仿冒会更加容易。（伪造一个随机的 id 很难，但伪造另一个用户名是很容易的）
-   2.全部保存在客户端，那么一旦被劫持，全部信息都会泄露
-   3.客户端数据量变大，网络传输的数据量也会变大

# session

session 的出现其实是服务端记住用户的一种方式，同时也是为了减轻客户端的压力。

好的，我们依然按照上面的流程，第一次输入用户名密码后，后端不返回 true 了，而是返回一个 sessionId 给我们。这时候后端也要维护一张存有所有人 sessionId 的表。前端拿到 sessionId 后每次请求带上这个 sessionId，后端就又知道了我是我！！！

这时候有一个问题，就是如果是一台服务器的话，这台服务器只要保存我提交的信息，以后每次从接口中取到 sessionId 然后和之前保存的信息做对比。

session 这种方式思路非常清晰，当只有一台服务器的时候，非常完美。但是当在集群中的时候，需要集群中的每台服务器都存储 session 信息，这对服务器来说压力巨大。

![avatar](/assets/images/Internet/cookie/session.png)

# JWT

为了解决服务器压力，干脆就不要存 session 信息了，当服务端接收到了用户名密码验证之后，下发一条 token.token 存在客户端，每次发起请求的时候携带 token。服务端接收之后解析，直接给权限即可。

这里要注意几点:

1.JWT 的数据结构：

1）jwt 头：JWT 头部分是一个描述 JWT 元数据的 JSON 对象

2）有效载荷：七个默认字段+自定义私有字段

3）签名=HMACSHA256(base64UrlEncode(header) + “.” + base64UrlEncode(payload),secret)

![avatar](/assets/images/Internet/cookie/jwt.png)

最后附一下 jwt 的特点：

1、JWT 默认不加密，但可以加密，生成原始令牌后，可以使用改令牌再次对其进行加密。

2、当 JWT 未加密方法是，一些私密数据无法通过 JWT 传输。

3、JWT 不仅可用于认证，还可用于信息交换，善用 JWT 有助于减少服务器请求数据库的次数。

4、JWT 的最大缺点是服务器不保存会话状态，所以在使用期间不可能取消令牌或更改令牌的权限，一旦 JWT 签

发，在有效期内将会一直有效。

5、JWT 本身包含认证信息，因此一旦信息泄露，任何人都可以获得令牌的所有权限。

6、为了减少盗用和窃取，JWT 不建议使用 HTTP 协议来传输代码，而是使用加密的 HTTPS 协议进行传输。
