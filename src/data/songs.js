const songs = [
  {
    name: "Something",
    youtubeLink: "https://www.youtube.com/watch?v=MZ3Vh8jZFdE",
    videoId: "MZ3Vh8jZFdE"
  },
  {
    name: "Oh! Darling",
    youtubeLink: "https://www.youtube.com/watch?v=erMgpfiOMSU",
    videoId: "erMgpfiOMSU"
  },
  {
    name: "I Want You (She's So Heavy)",
    youtubeLink: "https://www.youtube.com/watch?v=wNL6bd7SpDE",
    videoId: "wNL6bd7SpDE"
  },
  {
    name: "Golden Slumbers",
    youtubeLink: "https://www.youtube.com/watch?v=hwi2ynHPB80",
    videoId: "hwi2ynHPB80"
  },
  {
    name: "Come Together",
    youtubeLink: "https://www.youtube.com/watch?v=wqaKHHxQFZc",
    videoId: "wqaKHHxQFZc"
  },
  {
    name: "Here Comes The Sun",
    youtubeLink: "https://www.youtube.com/watch?v=GKdl-GCsNJ0",
    videoId: "GKdl-GCsNJ0"
  },
  {
    name: "Carry That Weight",
    youtubeLink: "https://www.youtube.com/watch?v=0RagyYjgY4g",
    videoId: "0RagyYjgY4g"
  },
  {
    name: "The End",
    youtubeLink: "https://www.youtube.com/watch?v=A5Tuu6UnEe8",
    videoId: "A5Tuu6UnEe8"
  },
  {
    name: "Maxwell's Silver Hammer",
    youtubeLink: "https://www.youtube.com/watch?v=3HuXFfq79I8",
    videoId: "3HuXFfq79I8"
  },
  {
    name: "You Never Give Me Your Money",
    youtubeLink: "https://www.youtube.com/watch?v=W8uZjeeOcQo",
    videoId: "W8uZjeeOcQo"
  },
  {
    name: "Because",
    youtubeLink: "https://www.youtube.com/watch?v=2XyuywVao7g",
    videoId: "2XyuywVao7g"
  },
  {
    name: "Octopus's Garden",
    youtubeLink: "https://www.youtube.com/watch?v=x9VzJpl05N0",
    videoId: "x9VzJpl05N0"
  },
  {
    name: "Polythene Pam",
    youtubeLink: "https://www.youtube.com/watch?v=Jq7VkBUQ2Xg",
    videoId: "Jq7VkBUQ2Xg"
  },
  {
    name: "Mean Mr Mustard",
    youtubeLink: "https://www.youtube.com/watch?v=Ts8L-6ghQuA",
    videoId: "Ts8L-6ghQuA"
  },
  {
    name: "Her Majesty",
    youtubeLink: "https://www.youtube.com/watch?v=QhmyhwszSWA",
    videoId: "QhmyhwszSWA"
  },
  {
    name: "Sun King",
    youtubeLink: "https://www.youtube.com/watch?v=ujBRavK6YWo",
    videoId: "ujBRavK6YWo"
  },
  {
    name: "Love Me Do",
    youtubeLink: "https://www.youtube.com/watch?v=0pGOFX1D_jg",
    videoId: "0pGOFX1D_jg"
  },
  {
    name: "P.S. I Love You",
    youtubeLink: "https://www.youtube.com/watch?v=MA5DkiVKSlM",
    videoId: "MA5DkiVKSlM"
  },
  {
    name: "Please Please Me",
    youtubeLink: "https://www.youtube.com/watch?v=czw8eqepir8",
    videoId: "czw8eqepir8"
  },
  {
    name: "Ask Me Why",
    youtubeLink: "https://www.youtube.com/watch?v=2ttGjtfQ7EA",
    videoId: "2ttGjtfQ7EA"
  },
  {
    name: "I Saw Her Standing There",
    youtubeLink: "https://www.youtube.com/watch?v=oxwAB3SECtc",
    videoId: "oxwAB3SECtc"
  },
  {
    name: "Misery",
    youtubeLink: "https://www.youtube.com/watch?v=qhbcN3ew9z0",
    videoId: "qhbcN3ew9z0"
  },
  {
    name: "Anna (Go To Him)",
    youtubeLink: "https://www.youtube.com/watch?v=b3zNKWyLfus",
    videoId: "b3zNKWyLfus"
  },
  {
    name: "Chains",
    youtubeLink: "https://www.youtube.com/watch?v=rJOhavaeJYk",
    videoId: "rJOhavaeJYk"
  },
  {
    name: "Boys",
    youtubeLink: "https://www.youtube.com/watch?v=Qr8OuW5JJgQ",
    videoId: "Qr8OuW5JJgQ"
  },
  {
    name: "Baby It's You",
    youtubeLink: "https://www.youtube.com/watch?v=AWUTlM6hz0g",
    videoId: "AWUTlM6hz0g"
  },
  {
    name: "Do You Want To Know A Secret",
    youtubeLink: "https://www.youtube.com/watch?v=uRQ7ecvU56k",
    videoId: "uRQ7ecvU56k"
  },
  {
    name: "A Taste of Honey",
    youtubeLink: "https://www.youtube.com/watch?v=MkQ1eOcl5ug",
    videoId: "MkQ1eOcl5ug"
  },
  {
    name: "There's A Place",
    youtubeLink: "https://www.youtube.com/watch?v=vTsbYbN8VVI",
    videoId: "vTsbYbN8VVI"
  },
  {
    name: "Twist and Shout",
    youtubeLink: "https://www.youtube.com/watch?v=2RicaUqd9Hg",
    videoId: "2RicaUqd9Hg"
  },
  {
    name: "From Me To You",
    youtubeLink: "https://www.youtube.com/watch?v=-XTB3bCYMK0",
    videoId: "-XTB3bCYMK0"
  },
  {
    name: "Thank You Girl",
    youtubeLink: "https://www.youtube.com/watch?v=cGka0tXQYAI",
    videoId: "cGka0tXQYAI"
  },
  {
    name: "She Loves You",
    youtubeLink: "https://www.youtube.com/watch?v=oVCwDl-S09A",
    videoId: "oVCwDl-S09A"
  },
  {
    name: "I'll Get You",
    youtubeLink: "https://www.youtube.com/watch?v=nFEHqFUONHY",
    videoId: "nFEHqFUONHY"
  },
  {
    name: "It Won't Be Long",
    youtubeLink: "https://www.youtube.com/watch?v=UVKU6SevefY",
    videoId: "UVKU6SevefY"
  },
  {
    name: "All I've Got To Do",
    youtubeLink: "https://www.youtube.com/watch?v=anMW41uvb_s",
    videoId: "anMW41uvb_s"
  },
  {
    name: "All My Loving",
    youtubeLink: "https://www.youtube.com/watch?v=TSpiwK5fig0",
    videoId: "TSpiwK5fig0"
  },
  {
    name: "Don't Bother Me",
    youtubeLink: "https://www.youtube.com/watch?v=k03IQbaTcxc",
    videoId: "k03IQbaTcxc"
  },
  {
    name: "Little Child",
    youtubeLink: "https://www.youtube.com/watch?v=DVMfLIoejTc",
    videoId: "DVMfLIoejTc"
  },
  {
    name: "Till There Was You",
    youtubeLink: "https://www.youtube.com/watch?v=SHAqAO7w8M8",
    videoId: "SHAqAO7w8M8"
  },
  {
    name: "Please Mister Postman",
    youtubeLink: "https://www.youtube.com/watch?v=v2Kk5IG2b8E",
    videoId: "v2Kk5IG2b8E"
  },
  {
    name: "Roll Over Beethoven",
    youtubeLink: "https://www.youtube.com/watch?v=Hz5jXwOXgKQ",
    videoId: "Hz5jXwOXgKQ"
  },
  {
    name: "Hold Me Tight",
    youtubeLink: "https://www.youtube.com/watch?v=H42Ou13za30",
    videoId: "H42Ou13za30"
  },
  {
    name: "You Really Got A Hold On Me",
    youtubeLink: "https://www.youtube.com/watch?v=9rokS8Ao4nQ",
    videoId: "9rokS8Ao4nQ"
  },
  {
    name: "I Wanna Be Your Man",
    youtubeLink: "https://www.youtube.com/watch?v=mnct7Qf3SUQ",
    videoId: "mnct7Qf3SUQ"
  },
  {
    name: "Devil In Her Heart",
    youtubeLink: "https://www.youtube.com/watch?v=IGe-jfFrxCk",
    videoId: "IGe-jfFrxCk"
  },
  {
    name: "Not A Second Time",
    youtubeLink: "https://www.youtube.com/watch?v=Gi8dTDuRCOk",
    videoId: "Gi8dTDuRCOk"
  },
  {
    name: "Money (That's What I Want)",
    youtubeLink: "https://www.youtube.com/watch?v=CeWjEYhk7Xo",
    videoId: "CeWjEYhk7Xo"
  },
  {
    name: "I Want To Hold Your Hand",
    youtubeLink: "https://www.youtube.com/watch?v=v1HDt1tknTc",
    videoId: "v1HDt1tknTc"
  },
  {
    name: "This Boy",
    youtubeLink: "https://www.youtube.com/watch?v=VhuU8KDLdO4",
    videoId: "VhuU8KDLdO4"
  },
  {
    name: "Can't Buy Me Love",
    youtubeLink: "https://www.youtube.com/watch?v=h3WJiqc_bEs",
    videoId: "h3WJiqc_bEs"
  },
  {
    name: "You Can't Do That",
    youtubeLink: "https://www.youtube.com/watch?v=6PK21u7YzmI",
    videoId: "6PK21u7YzmI"
  },
  {
    name: "Long Tall Sally",
    youtubeLink: "https://www.youtube.com/watch?v=w-iA9-D_Mbw",
    videoId: "w-iA9-D_Mbw"
  },
  {
    name: "I Call Your Name",
    youtubeLink: "https://www.youtube.com/watch?v=r5mzQHQxoSg",
    videoId: "r5mzQHQxoSg"
  },
  {
    name: "Slow Down",
    youtubeLink: "https://www.youtube.com/watch?v=HbsyDHxca7Y",
    videoId: "HbsyDHxca7Y"
  },
  {
    name: "Matchbox",
    youtubeLink: "https://www.youtube.com/watch?v=Brd2v1NcYWg",
    videoId: "Brd2v1NcYWg"
  },
  {
    name: "A Hard Day's Night",
    youtubeLink: "https://www.youtube.com/watch?v=AMSiHdrHl0g",
    videoId: "AMSiHdrHl0g"
  },
  {
    name: "Things We Said Today",
    youtubeLink: "https://www.youtube.com/watch?v=NItAlTsPuQg",
    videoId: "NItAlTsPuQg"
  },
  {
    name: "I Should Have Known Better",
    youtubeLink: "https://www.youtube.com/watch?v=5en2JMLA8Z0",
    videoId: "5en2JMLA8Z0"
  },
  {
    name: "If I Fell",
    youtubeLink: "https://www.youtube.com/watch?v=F_80s6S_7Vw",
    videoId: "F_80s6S_7Vw"
  },
  {
    name: "I'm Happy Just To Dance With You",
    youtubeLink: "https://www.youtube.com/watch?v=B7X1oUfa8uE",
    videoId: "B7X1oUfa8uE"
  },
  {
    name: "And I Love Her",
    youtubeLink: "https://www.youtube.com/watch?v=5tc0gLSSU1M",
    videoId: "5tc0gLSSU1M"
  },
  {
    name: "Tell Me Why",
    youtubeLink: "https://www.youtube.com/watch?v=GVub1QCUCGc",
    videoId: "GVub1QCUCGc"
  },
  {
    name: "Any Time At All",
    youtubeLink: "https://www.youtube.com/watch?v=WuB7F-gRdJo",
    videoId: "WuB7F-gRdJo"
  },
  {
    name: "I'll Cry Instead",
    youtubeLink: "https://www.youtube.com/watch?v=zfnkMBOSIUQ",
    videoId: "zfnkMBOSIUQ"
  },
  {
    name: "When I Get Home",
    youtubeLink: "https://www.youtube.com/watch?v=TN8odbpRgnU",
    videoId: "TN8odbpRgnU"
  },
  {
    name: "I'll Be Back",
    youtubeLink: "https://www.youtube.com/watch?v=fJSTBNTac6k",
    videoId: "fJSTBNTac6k"
  },
  {
    name: "I Feel Fine",
    youtubeLink: "https://www.youtube.com/watch?v=xLBVgnZyuic",
    videoId: "xLBVgnZyuic"
  },
  {
    name: "She's A Woman",
    youtubeLink: "https://www.youtube.com/watch?v=lQomFaLyQ5I",
    videoId: "lQomFaLyQ5I"
  },
  {
    name: "No Reply",
    youtubeLink: "https://www.youtube.com/watch?v=YgFo9STa70E",
    videoId: "YgFo9STa70E"
  },
  {
    name: "I'm A Loser",
    youtubeLink: "https://www.youtube.com/watch?v=f70Z3cvrQd0",
    videoId: "f70Z3cvrQd0"
  },
  {
    name: "Baby's In Black",
    youtubeLink: "https://www.youtube.com/watch?v=TJFpUb7JGYo",
    videoId: "TJFpUb7JGYo"
  },
  {
    name: "Rock And Roll Music",
    youtubeLink: "https://www.youtube.com/watch?v=IRF6nmqcbxo",
    videoId: "IRF6nmqcbxo"
  },
  {
    name: "I'll Follow The Sun",
    youtubeLink: "https://www.youtube.com/watch?v=28d_A_NuJ7A",
    videoId: "28d_A_NuJ7A"
  },
  {
    name: "Mr. Moonlight",
    youtubeLink: "https://www.youtube.com/watch?v=FZQ8nWZJrhA",
    videoId: "FZQ8nWZJrhA"
  },
  {
    name: "Kansas City - Hey, Hey, Hey, Hey",
    youtubeLink: "https://www.youtube.com/watch?v=4xvW-Nf9VAw",
    videoId: "4xvW-Nf9VAw"
  },
  {
    name: "Eight Days A Week",
    youtubeLink: "https://www.youtube.com/watch?v=XTfmuDjwQTw",
    videoId: "XTfmuDjwQTw"
  },
  {
    name: "Words Of Love",
    youtubeLink: "https://www.youtube.com/watch?v=no-nuFTHetE",
    videoId: "no-nuFTHetE"
  },
  {
    name: "Honey Don't",
    youtubeLink: "https://www.youtube.com/watch?v=XIc-VCw5r0A",
    videoId: "XIc-VCw5r0A"
  },
  {
    name: "Every Little Thing",
    youtubeLink: "https://www.youtube.com/watch?v=jrDikOz8YSU",
    videoId: "jrDikOz8YSU"
  },
  {
    name: "I Don't Want To Spoil The Party",
    youtubeLink: "http://youtube.com/watch?v=zqVDvLDLsjI",
    videoId: "zqVDvLDLsjI"
  },
  {
    name: "What You're Doing",
    youtubeLink: "https://www.youtube.com/watch?v=7Sba2LbhkVY",
    videoId: "7Sba2LbhkVY"
  },
  {
    name: "Everybody's Trying To Be My Baby",
    youtubeLink: "https://www.youtube.com/watch?v=wn7FiAdHcmw",
    videoId: "wn7FiAdHcmw"
  },
  {
    name: "Ticket To Ride",
    youtubeLink: "https://www.youtube.com/watch?v=UHsN9d4FTVI",
    videoId: "UHsN9d4FTVI"
  },
  {
    name: "Yes It Is",
    youtubeLink: "https://www.youtube.com/watch?v=acWj7M0-9rY",
    videoId: "acWj7M0-9rY"
  },
  {
    name: "You Like Me Too Much",
    youtubeLink: "https://www.youtube.com/watch?v=ZqCf3D26YlA",
    videoId: "ZqCf3D26YlA"
  },
  {
    name: "Bad Boy",
    youtubeLink: "https://www.youtube.com/watch?v=u8hOfWs2Xmw",
    videoId: "u8hOfWs2Xmw"
  },
  {
    name: "Dizzy Miss Lizzy",
    youtubeLink: "https://www.youtube.com/watch?v=psJ1cHm_su4",
    videoId: "psJ1cHm_su4"
  },
  {
    name: "Tell Me What You See",
    youtubeLink: "https://www.youtube.com/watch?v=bztiAcsATyI",
    videoId: "bztiAcsATyI"
  },
  {
    name: "Help!",
    youtubeLink: "https://www.youtube.com/watch?v=MKUex3fci5c",
    videoId: "MKUex3fci5c"
  },
  {
    name: "The Night Before",
    youtubeLink: "https://www.youtube.com/watch?v=7tD40D7jk-Q",
    videoId: "7tD40D7jk-Q"
  },
  {
    name: "You've Got To Hide Your Love Away",
    youtubeLink: "https://www.youtube.com/watch?v=V8nLraecPRY",
    videoId: "V8nLraecPRY"
  },
  {
    name: "I Need You",
    youtubeLink: "https://www.youtube.com/watch?v=6t24nX_sak8",
    videoId: "6t24nX_sak8"
  },
  {
    name: "Another Girl",
    youtubeLink: "https://www.youtube.com/watch?v=EMBYNWr5R_U",
    videoId: "EMBYNWr5R_U"
  },
  {
    name: "You're Going To Lose That Girl",
    youtubeLink: "https://www.youtube.com/watch?v=vqpEZuv29qE",
    videoId: "vqpEZuv29qE"
  },
  {
    name: "Act Naturally",
    youtubeLink: "https://www.youtube.com/watch?v=yjJd8rZPcAQ",
    videoId: "yjJd8rZPcAQ"
  },
  {
    name: "It's Only Love",
    youtubeLink: "https://www.youtube.com/watch?v=OPiKDHYCkjs",
    videoId: "OPiKDHYCkjs"
  },
  {
    name: "I've Just Seen A Face",
    youtubeLink: "https://www.youtube.com/watch?v=m8LbJfC0SYM",
    videoId: "m8LbJfC0SYM"
  },
  {
    name: "Yesterday",
    youtubeLink: "https://www.youtube.com/watch?v=NrgmdOz227I",
    videoId: "NrgmdOz227I"
  },
  {
    name: "We Can Work It Out",
    youtubeLink: "https://www.youtube.com/watch?v=IgRrWPdzkao",
    videoId: "IgRrWPdzkao"
  },
  {
    name: "Day Tripper",
    youtubeLink: "https://www.youtube.com/watch?v=2IbPn5j2YKk",
    videoId: "2IbPn5j2YKk"
  },
  {
    name: "Drive My Car",
    youtubeLink: "https://www.youtube.com/watch?v=kfSQkZuIx84",
    videoId: "kfSQkZuIx84"
  },
  {
    name: "Norwegian Wood (This Bird Has Flown)",
    youtubeLink: "https://www.youtube.com/watch?v=Y_V6y1ZCg_8",
    videoId: "Y_V6y1ZCg_8"
  },
  {
    name: "You Won't See Me",
    youtubeLink: "https://www.youtube.com/watch?v=OsjTO0yZQjk",
    videoId: "OsjTO0yZQjk"
  },
  {
    name: "Nowhere Man",
    youtubeLink: "https://www.youtube.com/watch?v=8scSwaKbE64",
    videoId: "8scSwaKbE64"
  },
  {
    name: "Think For Yourself",
    youtubeLink: "https://www.youtube.com/watch?v=vtx5NTxebJk",
    videoId: "vtx5NTxebJk"
  },
  {
    name: "The Word",
    youtubeLink: "https://www.youtube.com/watch?v=RfBEqiEhCgM",
    videoId: "RfBEqiEhCgM"
  },
  {
    name: "Michelle",
    youtubeLink: "https://www.youtube.com/watch?v=WoBLi5eE-wY",
    videoId: "WoBLi5eE-wY"
  },
  {
    name: "What Goes On",
    youtubeLink: "https://www.youtube.com/watch?v=PtC_l4kz7yw",
    videoId: "PtC_l4kz7yw"
  },
  {
    name: "Girl",
    youtubeLink: "https://www.youtube.com/watch?v=-8l3ntDR_lI",
    videoId: "-8l3ntDR_lI"
  },
  {
    name: "I'm Looking Through You",
    youtubeLink: "https://www.youtube.com/watch?v=gH6i9JAdJrQ",
    videoId: "gH6i9JAdJrQ"
  },
  {
    name: "In My Life",
    youtubeLink: "https://www.youtube.com/watch?v=YBcdt6DsLQA",
    videoId: "YBcdt6DsLQA"
  },
  {
    name: "Wait",
    youtubeLink: "https://www.youtube.com/watch?v=qJngWval8Bc",
    videoId: "qJngWval8Bc"
  },
  {
    name: "If I Needed Someone",
    youtubeLink: "https://www.youtube.com/watch?v=Kt5OoWr4v1k",
    videoId: "Kt5OoWr4v1k"
  },
  {
    name: "Run For Your Life",
    youtubeLink: "https://www.youtube.com/watch?v=yzHXtxcIkg4",
    videoId: "yzHXtxcIkg4"
  },
  {
    name: "Paperback Writer",
    youtubeLink: "https://www.youtube.com/watch?v=SepZDSkY4Ro",
    videoId: "SepZDSkY4Ro"
  },
  {
    name: "Rain",
    youtubeLink: "https://www.youtube.com/watch?v=FkY9BEuLJk4",
    videoId: "FkY9BEuLJk4"
  },
  {
    name: "Eleanor Rigby",
    youtubeLink: "https://www.youtube.com/watch?v=ZqYK9Qfh6kE",
    videoId: "ZqYK9Qfh6kE"
  },
  {
    name: "Yellow Submarine",
    youtubeLink: "https://www.youtube.com/watch?v=KuqMJ9qdflw",
    videoId: "KuqMJ9qdflw"
  },
  {
    name: "Taxman",
    youtubeLink: "https://www.youtube.com/watch?v=xYCntCKHy6I",
    videoId: "xYCntCKHy6I"
  },
  {
    name: "I'm Only Sleeping",
    youtubeLink: "https://www.youtube.com/watch?v=sAG3m3p9UeI",
    videoId: "sAG3m3p9UeI"
  },
  {
    name: "Love You To",
    youtubeLink: "https://www.youtube.com/watch?v=tE93TJDKTQU",
    videoId: "tE93TJDKTQU"
  },
  {
    name: "Here, There, And Everywhere",
    youtubeLink: "https://www.youtube.com/watch?v=vs7U4xfkAfI",
    videoId: "vs7U4xfkAfI"
  },
  {
    name: "She Said She Said",
    youtubeLink: "https://www.youtube.com/watch?v=3iybCwJdudM",
    videoId: "3iybCwJdudM"
  },
  {
    name: "Good Day Sunshine",
    youtubeLink: "https://www.youtube.com/watch?v=6dC7ILQ_vtE",
    videoId: "6dC7ILQ_vtE"
  },
  {
    name: "And Your Bird Can Sing",
    youtubeLink: "https://www.youtube.com/watch?v=sOUlbredoUM",
    videoId: "sOUlbredoUM"
  },
  {
    name: "For No One",
    youtubeLink: "https://www.youtube.com/watch?v=sep5E3ssXLQ",
    videoId: "sep5E3ssXLQ"
  },
  {
    name: "Doctor Robert",
    youtubeLink: "https://www.youtube.com/watch?v=-iYhUmcsFjI",
    videoId: "-iYhUmcsFjI"
  },
  {
    name: "I Want To Tell You",
    youtubeLink: "https://www.youtube.com/watch?v=yqUUBUbfK3U",
    videoId: "yqUUBUbfK3U"
  },
  {
    name: "Got To Get You Into My Life",
    youtubeLink: "https://www.youtube.com/watch?v=HzfnEB5foq4",
    videoId: "HzfnEB5foq4"
  },
  {
    name: "Tomorrow Never Knows",
    youtubeLink: "https://www.youtube.com/watch?v=O58ouPdjgo0",
    videoId: "O58ouPdjgo0"
  },
  {
    name: "Strawberry Fields Forever",
    youtubeLink: "https://www.youtube.com/watch?v=gS_-aHQxUqw",
    videoId: "gS_-aHQxUqw"
  },
  {
    name: "Penny Lane",
    youtubeLink: "https://www.youtube.com/watch?v=0wE0G9GTCAs",
    videoId: "0wE0G9GTCAs"
  },
  {
    name: "Sgt. Pepper's Lonely Hearts Club Band",
    youtubeLink: "https://www.youtube.com/watch?v=xwwABrNLvFs",
    videoId: "xwwABrNLvFs"
  },
  {
    name: "With A Little Help From My Friends",
    youtubeLink: "https://www.youtube.com/watch?v=GooL7-iPMYI",
    videoId: "GooL7-iPMYI"
  },
  {
    name: "Lucy In The Sky With Diamonds",
    youtubeLink: "https://www.youtube.com/watch?v=l7x-0c9jl4Y",
    videoId: "l7x-0c9jl4Y"
  },
  {
    name: "Getting Better",
    youtubeLink: "https://www.youtube.com/watch?v=w5F8wG4tUgA",
    videoId: "w5F8wG4tUgA"
  },
  {
    name: "Fixing A Hole",
    youtubeLink: "https://www.youtube.com/watch?v=nGRoSJaz-nw",
    videoId: "nGRoSJaz-nw"
  },
  {
    name: "She's Leaving Home",
    youtubeLink: "https://www.youtube.com/watch?v=LNsIgZqTTDY",
    videoId: "LNsIgZqTTDY"
  },
  {
    name: "Being For The Benefit Of Mr. Kite",
    youtubeLink: "https://www.youtube.com/watch?v=TJNndwGFJIM",
    videoId: "TJNndwGFJIM"
  },
  {
    name: "Within You Without You",
    youtubeLink: "https://www.youtube.com/watch?v=Mr54nqD1URA",
    videoId: "Mr54nqD1URA"
  },
  {
    name: "When I'm Sixty-Four",
    youtubeLink: "https://www.youtube.com/watch?v=f7TANPFMf1k",
    videoId: "f7TANPFMf1k"
  },
  {
    name: "Lovely Rita",
    youtubeLink: "https://www.youtube.com/watch?v=eqe_yLT8wd4",
    videoId: "eqe_yLT8wd4"
  },
  {
    name: "Good Morning, Good Morning",
    youtubeLink: "https://www.youtube.com/watch?v=Ru3O23zqqaE",
    videoId: "Ru3O23zqqaE"
  },
  {
    name: "Sgt. Pepper's Lonely Hearts Club Band (Reprise)",
    youtubeLink: "https://www.youtube.com/watch?v=6hMy0ByBiKM",
    videoId: "6hMy0ByBiKM"
  },
  {
    name: "A Day In The Life",
    youtubeLink: "https://www.youtube.com/watch?v=YSGHER4BWME",
    videoId: "YSGHER4BWME"
  },
  {
    name: "All You Need Is Love",
    youtubeLink: "https://www.youtube.com/watch?v=4EGczv7iiEk",
    videoId: "4EGczv7iiEk"
  },
  {
    name: "Baby You're A Rich Man",
    youtubeLink: "https://www.youtube.com/watch?v=i5m-sgtwFck",
    videoId: "i5m-sgtwFck"
  },
  {
    name: "Hello Goodbye",
    youtubeLink: "https://www.youtube.com/watch?v=P2C3f0Atcoo",
    videoId: "P2C3f0Atcoo"
  },
  {
    name: "I Am The Walrus",
    youtubeLink: "https://www.youtube.com/watch?v=dqOFHyQHEF4",
    videoId: "dqOFHyQHEF4"
  },
  {
    name: "Magical Mystery Tour",
    youtubeLink: "https://www.youtube.com/watch?v=ge214KAOnLY",
    videoId: "ge214KAOnLY"
  },
  {
    name: "The Fool On The Hill",
    youtubeLink: "https://www.youtube.com/watch?v=rtnAI1hgNyI",
    videoId: "rtnAI1hgNyI"
  },
  {
    name: "Flying",
    youtubeLink: "https://www.youtube.com/watch?v=Z1ONJQLdZrk",
    videoId: "Z1ONJQLdZrk"
  },
  {
    name: "Blue Jay Way",
    youtubeLink: "https://www.youtube.com/watch?v=ixmOAb6qzvY",
    videoId: "ixmOAb6qzvY"
  },
  {
    name: "Your Mother Should Know",
    youtubeLink: "https://www.youtube.com/watch?v=tCXsFjzMKdc",
    videoId: "tCXsFjzMKdc"
  },
  {
    name: "Lady Madonna",
    youtubeLink: "https://www.youtube.com/watch?v=czhd27cN2dg",
    videoId: "czhd27cN2dg"
  },
  {
    name: "The Inner Light",
    youtubeLink: "https://www.youtube.com/watch?v=swT6YTPYwgM",
    videoId: "swT6YTPYwgM"
  },
  {
    name: "Hey Jude",
    youtubeLink: "https://www.youtube.com/watch?v=mQER0A0ej0M",
    videoId: "mQER0A0ej0M"
  },
  {
    name: "Revolution",
    youtubeLink: "https://www.youtube.com/watch?v=6MbqzDm1uCo",
    videoId: "6MbqzDm1uCo"
  },
  {
    name: "Back In The USSR",
    youtubeLink: "https://www.youtube.com/watch?v=yOYArc7mFiE",
    videoId: "yOYArc7mFiE"
  },
  {
    name: "Dear Prudence",
    youtubeLink: "https://www.youtube.com/watch?v=I4xw_Dx0pIg",
    videoId: "I4xw_Dx0pIg"
  },
  {
    name: "Glass Onion",
    youtubeLink: "https://www.youtube.com/watch?v=jGhcsuqNIOc",
    videoId: "jGhcsuqNIOc"
  },
  {
    name: "Ob-La-Di, Ob-La-Da",
    youtubeLink: "https://www.youtube.com/watch?v=vYEY5Jmz3pU",
    videoId: "vYEY5Jmz3pU"
  },
  {
    name: "Wild Honey Pie",
    youtubeLink: "https://www.youtube.com/watch?v=iUndtEiqZc4",
    videoId: "iUndtEiqZc4"
  },
  {
    name: "The Continuing Story Of Bungalow Bill",
    youtubeLink: "https://www.youtube.com/watch?v=5yAOb477ano",
    videoId: "5yAOb477ano"
  },
  {
    name: "While My Guitar Gently Weeps",
    youtubeLink: "https://www.youtube.com/watch?v=YFDg-pgE0Hk",
    videoId: "YFDg-pgE0Hk"
  },
  {
    name: "Happiness Is A Warm Gun",
    youtubeLink: "https://www.youtube.com/watch?v=nIR6AAjEg5U",
    videoId: "nIR6AAjEg5U"
  },
  {
    name: "Martha My Dear",
    youtubeLink: "https://www.youtube.com/watch?v=SQaqoNZ_35o",
    videoId: "SQaqoNZ_35o"
  },
  {
    name: "I'm So Tired",
    youtubeLink: "https://www.youtube.com/watch?v=bJ_OMbWJ46g",
    videoId: "bJ_OMbWJ46g"
  },
  {
    name: "Blackbird",
    youtubeLink: "https://www.youtube.com/watch?v=c5GCNDw4X_0",
    videoId: "c5GCNDw4X_0"
  },
  {
    name: "Piggies",
    youtubeLink: "https://www.youtube.com/watch?v=t0nzZ8-kIf0",
    videoId: "t0nzZ8-kIf0"
  },
  {
    name: "Rocky Raccoon",
    youtubeLink: "https://www.youtube.com/watch?v=y7WBngMzqS4",
    videoId: "y7WBngMzqS4"
  },
  {
    name: "Don't Pass Me By",
    youtubeLink: "https://www.youtube.com/watch?v=U7ivAZqWKH0",
    videoId: "U7ivAZqWKH0"
  },
  {
    name: "Why Don't We Do It In The Road",
    youtubeLink: "https://www.youtube.com/watch?v=V7jel2l_iag",
    videoId: "V7jel2l_iag"
  },
  {
    name: "I Will",
    youtubeLink: "https://www.youtube.com/watch?v=SZBsVbKROV0",
    videoId: "SZBsVbKROV0"
  },
  {
    name: "Julia",
    youtubeLink: "https://www.youtube.com/watch?v=OKDloS2gBHs",
    videoId: "OKDloS2gBHs"
  },
  {
    name: "Birthday",
    youtubeLink: "https://www.youtube.com/watch?v=UeOHAzjxLhk",
    videoId: "UeOHAzjxLhk"
  },
  {
    name: "Yer Blues",
    youtubeLink: "https://www.youtube.com/watch?v=huR__xAcUQs",
    videoId: "huR__xAcUQs"
  },
  {
    name: "Mother Nature's Son",
    youtubeLink: "https://www.youtube.com/watch?v=9Ta9FUOQ4oY",
    videoId: "9Ta9FUOQ4oY"
  },
  {
    name: "Everybody's Got Something To Hide Except For Me And My Monkey",
    youtubeLink: "https://www.youtube.com/watch?v=4fv_gCn1CUU",
    videoId: "4fv_gCn1CUU"
  },
  {
    name: "Sexy Sadie",
    youtubeLink: "https://www.youtube.com/watch?v=l5DMdnf9me0",
    videoId: "l5DMdnf9me0"
  },
  {
    name: "Helter Skelter",
    youtubeLink: "https://www.youtube.com/watch?v=Uk1hCSA89fc",
    videoId: "Uk1hCSA89fc"
  },
  {
    name: "Long, Long, Long",
    youtubeLink: "https://www.youtube.com/watch?v=yp5elOxcT34",
    videoId: "yp5elOxcT34"
  },
  {
    name: "Honey Pie",
    youtubeLink: "https://www.youtube.com/watch?v=1ELUBYZ61o4",
    videoId: "1ELUBYZ61o4"
  },
  {
    name: "Savoy Truffle",
    youtubeLink: "https://www.youtube.com/watch?v=eHlyjSm0eR4",
    videoId: "eHlyjSm0eR4"
  },
  {
    name: "Cry Baby Cry",
    youtubeLink: "https://www.youtube.com/watch?v=Lb6TyIIb1fI",
    videoId: "Lb6TyIIb1fI"
  },
  {
    name: "Revolution #9",
    youtubeLink: "https://www.youtube.com/watch?v=jF7SgFtSbaI",
    videoId: "jF7SgFtSbaI"
  },
  {
    name: "Good Night",
    youtubeLink: "https://www.youtube.com/watch?v=FBxeM77LO7w",
    videoId: "FBxeM77LO7w"
  },
  {
    name: "Only A Northern Song",
    youtubeLink: "https://www.youtube.com/watch?v=vcvd-L73Cqs",
    videoId: "vcvd-L73Cqs"
  },
  {
    name: "All Together Now",
    youtubeLink: "https://www.youtube.com/watch?v=73lj5qJbrms",
    videoId: "73lj5qJbrms"
  },
  {
    name: "Hey Bulldog",
    youtubeLink: "https://www.youtube.com/watch?v=g6DVE305g0s",
    videoId: "g6DVE305g0s"
  },
  {
    name: "It's All Too Much",
    youtubeLink: "https://www.youtube.com/watch?v=2zc3idF_IZ0",
    videoId: "2zc3idF_IZ0"
  },
  {
    name: "Get Back",
    youtubeLink: "https://www.youtube.com/watch?v=xNQXWAeLo3s",
    videoId: "xNQXWAeLo3s"
  },
  {
    name: "Don't Let Me Down",
    youtubeLink: "https://www.youtube.com/watch?v=Xz1g63DlVAU",
    videoId: "Xz1g63DlVAU"
  },
  {
    name: "The Ballad Of John And Yoko",
    youtubeLink: "https://www.youtube.com/watch?v=oZnm_s3wZeo",
    videoId: "oZnm_s3wZeo"
  },
  {
    name: "Old Brown Shoe",
    youtubeLink: "https://www.youtube.com/watch?v=GGUzvyIdy9A",
    videoId: "GGUzvyIdy9A"
  },
  {
    name: "Let It Be",
    youtubeLink: "https://www.youtube.com/watch?v=AbNFLI720_U",
    videoId: "AbNFLI720_U"
  },
  {
    name: "You Know My Name (Look Up The Number)",
    youtubeLink: "https://www.youtube.com/watch?v=iMhKWOP6EZQ",
    videoId: "iMhKWOP6EZQ"
  },
  {
    name: "Across The Universe",
    youtubeLink: "https://www.youtube.com/watch?v=eqUzU552X8A",
    videoId: "eqUzU552X8A"
  },
  {
    name: "Two Of Us",
    youtubeLink: "https://www.youtube.com/watch?v=dwtaADfz2WU",
    videoId: "dwtaADfz2WU"
  },
  {
    name: "Dig A Pony",
    youtubeLink: "https://www.youtube.com/watch?v=cxjzrfXMkao",
    videoId: "cxjzrfXMkao"
  },
  {
    name: "I Me Mine",
    youtubeLink: "https://www.youtube.com/watch?v=LBZ6hg7RVp8",
    videoId: "LBZ6hg7RVp8"
  },
  {
    name: "Dig It",
    youtubeLink: "https://www.youtube.com/watch?v=CAtFrU978Xc",
    videoId: "CAtFrU978Xc"
  },
  {
    name: "I've Got A Feeling",
    youtubeLink: "https://www.youtube.com/watch?v=3pPZRgb7uc8",
    videoId: "3pPZRgb7uc8"
  },
  {
    name: "One After 909",
    youtubeLink: "https://www.youtube.com/watch?v=RLjJ3VrRKx4",
    videoId: "RLjJ3VrRKx4"
  },
  {
    name: "The Long And Winding Road",
    youtubeLink: "https://www.youtube.com/watch?v=GLkhWfVIxi8",
    videoId: "GLkhWfVIxi8"
  },
  {
    name: "For You Blue",
    youtubeLink: "https://www.youtube.com/watch?v=Li9hWkZmh7g",
    videoId: "Li9hWkZmh7g"
  },
  {
    name: "Free As A Bird",
    youtubeLink: "https://www.youtube.com/watch?v=6cDHvw8fn2c",
    videoId: "6cDHvw8fn2c"
  },
  {
    name: "Real Love",
    youtubeLink: "https://www.youtube.com/watch?v=Y2iDmuoIRl0",
    videoId: "Y2iDmuoIRl0"
  },
  {
    name: "Now And Then",
    youtubeLink: "https://www.youtube.com/watch?v=AW55J2zE3N4",
    videoId: "AW55J2zE3N4"
  }
];

export default songs; 