// v1.2
(function () {

	const chatInput = window.OWOP.require ? window.OWOP.require('main').elements.chatInput : document.getElementById('chat-input');

	const chat = window.OWOP.require ? window.OWOP.require('main').elements.chat : document.getElementById('chat');

	const chatMessages = window.OWOP.require ? window.OWOP.require('main').elements.chatMessages : document.getElementById('chat-messages');

	let localStor = window.OWOP.require ? window.OWOP.require('main').misc.localStorage : localStorage;

	const tooltip = window.OWOP.require ? window.OWOP.require('global').PublicAPI.util.setTooltip : window.OWOP.util.setTooltip;

	const context = window.OWOP.require ? window.OWOP.require('context') : {
		'createContextMenu': () => {}
	};

	const coreChat = window.OPM.require ? window.OPM.require('core-utils').chat : {
		'on': () => {},
		'off': () => {}
	};

	//const owopChat = window.OWOP.require ? window.OWOP.require('global').PublicAPI.chat : window.OWOP.chat;

	const body = document.getElementsByTagName('body')[0];

	const head = document.getElementsByTagName('head')[0];

	let isInstalled = false;

	let discordEmojisList = {
		'Our World Of Pixels': {
			'665168270256635915': {
				'name': '1010'
			},
			'665062954898817027': {
				'name': 'zzz-1'
			},
			'581595783174946839': {
				'name': 'yes'
			},
			'665062955167121431': {
				'name': 'yay'
			},
			'665062954802085889': {
				'name': 'what'
			},
			'419611587410919424': {
				'name': 'wat'
			},
			'466915174113083392': {
				'name': 'Waaaaaaaaaaaaaaaaaah'
			},
			'524570164432338946': {
				'name': 'Troomp'
			},
			'492794496816381952': {
				'name': 'tonq'
			},
			'611075759624290314': {
				'name': 'thixel'
			},
			'665062955125178380': {
				'name': 'thinq'
			},
			'665062954747691044': {
				'name': 'teef'
			},
			'665062955091755028': {
				'name': 'smug'
			},
			'402379352937070602': {
				'name': 'skull-1'
			},
			'665062954693296131': {
				'name': 'shock'
			},
			'546906694261800980': {
				'name': 'rip'
			},
			'398521340925181986': {
				'name': 'PixelThinkaaaaaaaaaaaaaaaaaaaaaa'
			},
			'398521326337261568': {
				'name': 'PixelThinkaaa'
			},
			'352424038829654027': {
				'name': 'PixelThink'
			},
			'557918878429216778': {
				'name': 'owocry'
			},
			'557918846938513408': {
				'name': 'owo'
			},
			'546906664092172317': {
				'name': 'ohno'
			},
			'665062954722525185': {
				'name': 'ohno-1'
			},
			'665062955112595456': {
				'name': 'OHHELLNO'
			},
			'665062955074715648': {
				'name': 'notcool'
			},
			'581595783065763890': {
				'name': 'no'
			},
			'557918398387060748': {
				'name': 'lmaoof'
			},
			'409708038589775872': {
				'name': 'JP'
			},
			'665062955058069537': {
				'name': 'huh'
			},
			'557918894501789707': {
				'name': 'hmmst'
			},
			'557986551452139520': {
				'name': 'heartixel'
			},
			'526437127672561667': {
				'name': 'Handsum_thonq'
			},
			'569507889694113794': {
				'name': 'gyah_no_u'
			},
			'567746069677473801': {
				'name': 'gyah'
			},
			'665062955036966915': {
				'name': 'glare'
			},
			'594858352241016845': {
				'name': 'fink'
			},
			'665871787116199936': {
				'name': 'erhb'
			},
			'569147376724606981': {
				'name': 'erh'
			},
			'665062955053875201': {
				'name': 'derp'
			},
			'665062955024515092': {
				'name': 'bruh'
			},
			'546906617879330839': {
				'name': 'bro'
			},
			'404320586379165706': {
				'name': 'botato'
			},
			'665062955045617674': {
				'name': 'bot'
			},
			'420666130802147330': {
				'name': 'banhammer'
			},
			'665062954743365643': {
				'name': 'bad'
			},
			'665062955125309460': {
				'name': 'awesome'
			},
			'430496603237777412': {
				'name': 'Angerybob'
			},
			'665062955045617694': {
				'name': 'aha'
			},
			'665055615902547977': {
				'name': 'Adine_Thunk'
			},
			'405148209313480725': {
				'name': '__'
			}
		},
		'Deleted emojis of "Our World Of Pixels"': {
			'618810593507278848': {
				'name': 'it'
			},
			'568684494064844801': {
				'name': 'zzz-1'
			},
			'568684494056587284': {
				'name': 'yay'
			},
			'568684340674822147': {
				'name': 'what'
			},
			'568684493884358677': {
				'name': 'ohno-1'
			},
			'568684340373094413': {
				'name': 'OHHELLNO'
			},
			'568684240955506689': {
				'name': 'notcool'
			},
			'568684340675084288': {
				'name': 'huh'
			},
			'568966632702214145': {
				'name': 'erhb'
			},
			'568684340750450708': {
				'name': 'derp'
			},
			'568684240921690113': {
				'name': 'bruh'
			},
			'568684241169285121': {
				'name': 'beepboop'
			},
			'568684494048198657': {
				'name': 'bad'
			},
			'568684494081622026': {
				'name': 'awesome'
			},
			'568684340687405056': {
				'name': 'lol'
			},
			'568684241236525056': {
				'name': 'aha'
			},
			'564246531666870273': {
				'name': 'erh'
			},
			'563739029024145417': {
				'name': 'yeesh'
			},
			'571690907129085972': {
				'name': 'teef'
			},
			'513041290787553285': {
				'name': 'ha'
			},
			'469973110322626560': {
				'name': 'E_'
			},
			'469493271039574016': {
				'name': 'sexyminion'
			},
			'463791691162189825': {
				'name': 'dot'
			},
			'449059000739430421': {
				'name': 'happy'
			},
			'448601567143133205': {
				'name': 'Krabs'
			},
			'446367808620855308': {
				'name': 'tingle'
			},
			'440388417809809419': {
				'name': 'smug'
			},
			'440388200083488778': {
				'name': 'meh'
			},
			'440105609002483713': {
				'name': 'areyoukiddingme'
			},
			'440104394588028938': {
				'name': 'lenny'
			},
			'438630732424937484': {
				'name': 'durr'
			},
			'438630731602984961': {
				'name': 'mmm'
			},
			'438630556826206209': {
				'name': 'sad'
			},
			'438630556658302976': {
				'name': 'thunk'
			},
			'438630556570484737': {
				'name': 'stahp'
			},
			'438630556511502336': {
				'name': 'oOoo'
			},
			'438630556473884682': {
				'name': 'okthen'
			},
			'438630556322889730': {
				'name': 'morty'
			},
			'438630543697903616': {
				'name': 'ded'
			},
			'438630729941778432': {
				'name': 'void'
			},
			'438630553332350978': {
				'name': 'thinq'
			},
			'438630542905180162': {
				'name': 'mad'
			},
			'436877488631840768': {
				'name': 'frogwhat'
			},
			'436877392640868352': {
				'name': 'oof'
			},
			'434315986036981760': {
				'name': 'lol'
			},
			'434315909851512832': {
				'name': 'epicFace'
			},
			'424585757664215041': {
				'name': 'madcar'
			},
			'423505517176946699': {
				'name': 'catThinkaaa'
			},
			'412433024106496010': {
				'name': 'ULTRAOHNO'
			},
			'411450961949753345': {
				'name': 'jjb'
			},
			'407520404970799104': {
				'name': 'BigTheCat'
			},
			'402393679068921858': {
				'name': 'sanic'
			},
			'400111886965800963': {
				'name': 'DoUNoDaWae'
			},
			'368059237483413514': {
				'name': 'maccdown'
			},
			'368058212005576724': {
				'name': 'treasure'
			},
			'368057395126992907': {
				'name': 'snow'
			},
			'368057122245705729': {
				'name': 'halloween'
			},
			'352849931611930624': {
				'name': 'Eraser'
			},
			'352849476303716353': {
				'name': 'Cursor'
			}
		},
		'dimden.plex': {
			'676089920141656113': {
				'name': 'zahuyaru'
			},
			'605547866399703040': {
				'name': 'zaeboomba'
			},
			'679646502691668003': {
				'name': 'yummifingers'
			},
			'581753989884805120': {
				'name': 'yes'
			},
			'611335124256161813': {
				'name': 'yay'
			},
			'616958837366325262': {
				'name': 'yasnohueta'
			},
			'606511108970512395': {
				'name': 'wat'
			},
			'681314625454866443': {
				'name': 'uhhh'
			},
			'681112333665566775': {
				'name': 'uhh'
			},
			'638018185165013032': {
				'name': 'udoli'
			},
			'676144976006217729': {
				'name': 'tor4'
			},
			'597110212087775251': {
				'name': 'tonq'
			},
			'581753989784141824': {
				'name': 'tonc'
			},
			'660954504463777792': {
				'name': 'thinkdun'
			},
			'582315985172955146': {
				'name': 'thinccflat'
			},
			'581753989721358342': {
				'name': 'thinccfat'
			},
			'600650279343357963': {
				'name': 'Thiccccc'
			},
			'644297092025679873': {
				'name': 'tehe'
			},
			'597110212251615242': {
				'name': 'teef'
			},
			'597107897419431986': {
				'name': 'tabeop'
			},
			'621384529176952843': {
				'name': 'sunglas'
			},
			'682215789935460396': {
				'name': 'suicide'
			},
			'682943766814130206': {
				'name': 'squee_blush'
			},
			'581753990006439941': {
				'name': 'squee'
			},
			'597105785843220511': {
				'name': 'Spravedlivo'
			},
			'597110212142563328': {
				'name': 'smug'
			},
			'676840134469222400': {
				'name': 'shutthefuckup'
			},
			'597107899470446614': {
				'name': 'seks'
			},
			'598878981957353472': {
				'name': 'RoflanZdarova'
			},
			'598878981001052161': {
				'name': 'RoflanZachto'
			},
			'597105713244012578': {
				'name': 'RoflanPominki'
			},
			'632313967674523679': {
				'name': 'RoflanPizdec'
			},
			'611298834190172170': {
				'name': 'RoflanEbanizm'
			},
			'597105758865195020': {
				'name': 'RoflanEbalo'
			},
			'597793305245515817': {
				'name': 'pressf'
			},
			'597107897117179904': {
				'name': 'poebat'
			},
			'672482038720233482': {
				'name': 'plita'
			},
			'622752405418672128': {
				'name': 'pizdecblyat'
			},
			'643162562199945226': {
				'name': 'pensivebread'
			},
			'581753989750587392': {
				'name': 'owocry'
			},
			'682940677549850646': {
				'name': 'owocat'
			},
			'621708764109602816': {
				'name': 'oops'
			},
			'657899236330831898': {
				'name': 'ohshit'
			},
			'597109543704723545': {
				'name': 'manageyourselfpls'
			},
			'606850477858226217': {
				'name': 'lol'
			},
			'581753989842993153': {
				'name': 'lmaoof'
			},
			'680915628240273422': {
				'name': 'lennypt2'
			},
			'680915629871464458': {
				'name': 'lennypt1'
			},
			'676090384451108934': {
				'name': 'kto'
			},
			'597793305878724618': {
				'name': 'KABO'
			},
			'684885395665977344': {
				'name': 'gyahh'
			},
			'685959399360954387': {
				'name': 'gazetablyat'
			},
			'685948841199009852': {
				'name': 'gazeta'
			},
			'597109547618009109': {
				'name': 'frogthincc'
			},
			'622779314848399384': {
				'name': 'foo'
			},
			'597107897402654730': {
				'name': 'fofthecops'
			},
			'581753989763301385': {
				'name': 'fof'
			},
			'677169137964810240': {
				'name': 'durka'
			},
			'690326139855831041': {
				'name': 'drrrrrrr'
			},
			'582132091408613376': {
				'name': 'Donana'
			},
			'597793305455230986': {
				'name': 'dolboeb'
			},
			'597725273529778199': {
				'name': 'dimden'
			},
			'651760125874405386': {
				'name': 'coolstorybob'
			},
			'643214716612640778': {
				'name': 'bruh'
			},
			'625404854721970217': {
				'name': 'bonk'
			},
			'597793353437806652': {
				'name': 'banhammer'
			},
			'682160799011045416': {
				'name': 'antipensivebread'
			},
			'597793305186664477': {
				'name': 'anahuya'
			},
			'597110212150820867': {
				'name': '__'
			}
		},
		'Deleted emojis of "dimden.plex"': {
			'688851824983146498': {
				'name': 'neutral'
			}
		},
		'Techmojis': {
			'536588731503869962': {
				'name': 'techMYahoo'
			},
			'534593828976328714': {
				'name': 'techMXbox'
			},
			'534592068538859521': {
				'name': 'techMTwitter'
			},
			'534594728805662720': {
				'name': 'techMSC'
			},
			'534591797893267476': {
				'name': 'techMSamsung'
			},
			'534595320210915329': {
				'name': 'techMRazer'
			},
			'534592884607811595': {
				'name': 'techMPS'
			},
			'534591497920577536': {
				'name': 'techMMicrosoft'
			},
			'534591709573808139': {
				'name': 'techMLG'
			},
			'534593599397167118': {
				'name': 'techMLenovo'
			},
			'534592357467815936': {
				'name': 'techMIntel'
			},
			'534592167340015616': {
				'name': 'techMIG'
			},
			'534593709191462912': {
				'name': 'techMHP'
			},
			'534591590623215636': {
				'name': 'techMGoogle'
			},
			'534591936909148178': {
				'name': 'techMFB'
			},
			'534592997774327821': {
				'name': 'techMDiscord'
			},
			'534593661837770772': {
				'name': 'techMDell'
			},
			'534595100236447780': {
				'name': 'techMCanonical'
			},
			'534591538802720768': {
				'name': 'techMApple'
			},
			'534594921521217546': {
				'name': 'techMAMD'
			},
			'534593330466652171': {
				'name': 'techMAmazon'
			},
			'534592392574271488': {
				'name': 'lmaoof'
			},
			'534592458395484181': {
				'name': 'cia'
			}
		},
		'Stewachip\'s Lobby': {
			'683254247126859817': {
				'name': 'WHAT'
			},
			'683573895089094670': {
				'name': 'think'
			},
			'688828618767466636': {
				'name': 'surprised'
			},
			'683254246887391396': {
				'name': 'happy'
			}
		},
		'MINECRAFT': {
			'628987335731576855': {
				'name': 'xbox'
			},
			'441951184886956033': {
				'name': 'villager_huh'
			},
			'586072006097633280': {
				'name': 'upvote'
			},
			'628987335668662292': {
				'name': 'switch'
			},
			'324967956566245377': {
				'name': 'stone'
			},
			'651847833699352578': {
				'name': 'steve_thumbsup'
			},
			'425381858121875459': {
				'name': 'steve_thinking'
			},
			'588100936010825744': {
				'name': 'steve_sick'
			},
			'681217726412488767': {
				'name': 'steve_peek'
			},
			'589630625560920090': {
				'name': 'steve_not_like_this'
			},
			'441951277211975681': {
				'name': 'steve_nope'
			},
			'586933273058607115': {
				'name': 'steve_love'
			},
			'586068093827153931': {
				'name': 'steve_lol'
			},
			'641909874187304960': {
				'name': 'steve_hug'
			},
			'672129224131477534': {
				'name': 'steve_flushed'
			},
			'425370892181176331': {
				'name': 'steve_dabbing'
			},
			'588100936359215104': {
				'name': 'steve_crying'
			},
			'592954156411781120': {
				'name': 'steve_cowboy'
			},
			'573746081087750164': {
				'name': 'steve_cool'
			},
			'592377771628691460': {
				'name': 'steve_clown'
			},
			'302438795385634847': {
				'name': 'steve'
			},
			'425375090511970314': {
				'name': 'snow_golem'
			},
			'316977001850470402': {
				'name': 'slurpee'
			},
			'302440064472973312': {
				'name': 'slime'
			},
			'675559907788980237': {
				'name': 'skeleton_cowboy'
			},
			'425377592024104960': {
				'name': 'shocked_ghast'
			},
			'441951082235691020': {
				'name': 'rotten_flesh_gross'
			},
			'602416962647359488': {
				'name': 'redstone'
			},
			'309459767758290944': {
				'name': 'reddit'
			},
			'309478404208590849': {
				'name': 'reactor'
			},
			'628987335815725062': {
				'name': 'playstation'
			},
			'427072148671168533': {
				'name': 'pinged_villager'
			},
			'425374026903584779': {
				'name': 'pinged_creeper'
			},
			'609251357328932879': {
				'name': 'pillager_banner'
			},
			'316976817044979712': {
				'name': 'pikachu'
			},
			'674735134687232010': {
				'name': 'pig_unamused'
			},
			'631748221697392650': {
				'name': 'ocelot'
			},
			'425391425727889408': {
				'name': 'observer'
			},
			'631755513326993408': {
				'name': 'nether_quartz'
			},
			'628987335823982592': {
				'name': 'mojang'
			},
			'442734230175481856': {
				'name': 'minecoin'
			},
			'628987335362478107': {
				'name': 'microsoft'
			},
			'302439627992858624': {
				'name': 'mc_zombie'
			},
			'304704745065414666': {
				'name': 'mc_wolf'
			},
			'302439512544509952': {
				'name': 'mc_skeleton'
			},
			'302439127322722314': {
				'name': 'mc_sheep'
			},
			'631744909409386506': {
				'name': 'mc_potato'
			},
			'302439003012202496': {
				'name': 'mc_pig'
			},
			'589630433243955205': {
				'name': 'mc_heart'
			},
			'560328871887503400': {
				'name': 'mc_fox_sleeping'
			},
			'594204020789477376': {
				'name': 'mc_fox'
			},
			'589630396476555264': {
				'name': 'mc_earth'
			},
			'589630502588383241': {
				'name': 'mc_discord'
			},
			'602104065522008064': {
				'name': 'mc_disc'
			},
			'302439066828406784': {
				'name': 'mc_cow'
			},
			'309467336274870274': {
				'name': 'mc_cookie'
			},
			'302439338292281345': {
				'name': 'mc_chicken'
			},
			'604895531566891009': {
				'name': 'mc_cake'
			},
			'631748221626220544': {
				'name': 'llama-1'
			},
			'631755512978997249': {
				'name': 'lapis_lazuli'
			},
			'627001644302729216': {
				'name': 'jeb_shrug'
			},
			'627001761835778078': {
				'name': 'jeb_head_scratch'
			},
			'627001674371694592': {
				'name': 'jeb_happy'
			},
			'627001713207017484': {
				'name': 'jeb_curious'
			},
			'627001802231119872': {
				'name': 'jeb_big_eyes'
			},
			'494553523065978905': {
				'name': 'jeb'
			},
			'598000584691417098': {
				'name': 'java'
			},
			'631748221131292674': {
				'name': 'iron_golem'
			},
			'590724451566485546': {
				'name': 'iron'
			},
			'631748221424893963': {
				'name': 'guardian'
			},
			'601353406577246208': {
				'name': 'grass_block'
			},
			'325831548198715393': {
				'name': 'grass'
			},
			'590724618386538516': {
				'name': 'gold'
			},
			'302439828463550464': {
				'name': 'ghast'
			},
			'302439778081832961': {
				'name': 'enderman'
			},
			'631744470718611479': {
				'name': 'ender_dragon'
			},
			'590539774365007912': {
				'name': 'emerald'
			},
			'631748221496066087': {
				'name': 'drowned'
			},
			'425389302294511628': {
				'name': 'dropper'
			},
			'586072029208379393': {
				'name': 'downvote'
			},
			'324967464532312064': {
				'name': 'dirt'
			},
			'309458615041916928': {
				'name': 'diamond_sword'
			},
			'631758299368521749': {
				'name': 'diamond_shovel'
			},
			'309458671925198848': {
				'name': 'diamond_pickaxe'
			},
			'631758299691352074': {
				'name': 'diamond_hoe'
			},
			'631758299649540097': {
				'name': 'diamond_axe'
			},
			'591783543663886352': {
				'name': 'diamond'
			},
			'429631402263445518': {
				'name': 'derp_pufferfish'
			},
			'429657698351710208': {
				'name': 'derp_potato'
			},
			'589630583857217546': {
				'name': 'denied'
			},
			'585628292611309578': {
				'name': 'dedicated_server'
			},
			'425369771026939914': {
				'name': 'creeper'
			},
			'633236735534563328': {
				'name': 'command_block_rc'
			},
			'633236735819776000': {
				'name': 'command_block_r'
			},
			'633236735559598118': {
				'name': 'command_block_ic'
			},
			'633236735345557506': {
				'name': 'command_block_i'
			},
			'633236735555272733': {
				'name': 'command_block_cc'
			},
			'633236735530369024': {
				'name': 'command_block_c'
			},
			'631754680753717258': {
				'name': 'coal'
			},
			'628987335366672394': {
				'name': 'apple-1'
			},
			'585712635832565763': {
				'name': 'angry_panda'
			},
			'628987335056556065': {
				'name': 'android'
			},
			'589630561140867083': {
				'name': 'allowed'
			},
			'441950999805034496': {
				'name': 'alex_yes'
			},
			'602383396236427276': {
				'name': 'alex_cowgirl'
			},
			'302438846283644930': {
				'name': 'alex'
			},
			'627001974394585089': {
				'name': 'agnes_yes'
			},
			'627002058209492994': {
				'name': 'agnes_point'
			},
			'627001921038843925': {
				'name': 'agnes_happy'
			},
			'627001855464964116': {
				'name': 'agnes_eww'
			},
			'627002022498926602': {
				'name': 'agnes_cringe'
			},
			'494553591755833355': {
				'name': 'agnes'
			},
			'578822331766538240': {
				'name': '10_years'
			}
		},
		'Tixtels': {
			'504641894572097546': {
				'name': 'yes'
			},
			'474149199726772224': {
				'name': 'weSmart'
			},
			'476032536015929344': {
				'name': 'topkek'
			},
			'516596961957249038': {
				'name': 'tixtelsman'
			},
			'478246842933706753': {
				'name': 'tickYes'
			},
			'478246871626940416': {
				'name': 'tickNo'
			},
			'474148947225739265': {
				'name': 'thonk'
			},
			'494215355862876190': {
				'name': 'thinkOP'
			},
			'474239769510019082': {
				'name': 'thinkok'
			},
			'499257993855107073': {
				'name': 'thinkFine'
			},
			'474150119931904025': {
				'name': 'thincord'
			},
			'504641894870155267': {
				'name': 'sey'
			},
			'517439209099755521': {
				'name': 'santxman'
			},
			'474149488269721622': {
				'name': 'pixelthonk'
			},
			'504641894912098315': {
				'name': 'pixelcheckaaa'
			},
			'474239729592958983': {
				'name': 'okthink'
			},
			'475648219955593216': {
				'name': 'lol'
			},
			'474239632029253633': {
				'name': 'kms'
			},
			'477486070699786251': {
				'name': 'fpthonk'
			},
			'516569430965223444': {
				'name': 'fof'
			},
			'474149019560443904': {
				'name': 'coolthonk'
			},
			'474148748562530305': {
				'name': 'catThinkaaa'
			}
		}
	};

	let style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'emotes';

	let emotesButton = document.createElement('button');
	emotesButton.id = 'emote-button';

	let emotesList = document.createElement('div');
	emotesList.id = 'emotes-list';

	let title = document.createElement('div');
	title.id = 'emotes-title';
	title.textContent = 'Emotes';

	let emotesListContainer = document.createElement('div');
	emotesListContainer.id = 'emotes-container';

	let customEmotesCategory = document.createElement('div');
	customEmotesCategory.id = 'custom-emotes-category';

	let customEmotesCategoryName = document.createElement('div');
	customEmotesCategoryName.id = 'category-title';
	customEmotesCategoryName.textContent = 'Custom';
	try {
		tooltip(customEmotesCategoryName.title, 'Remove the custom emote by right clicking on it.');
	} catch (err) {
		customEmotesCategoryName.title = 'Remove the custom emote by right clicking on it.';
	}

	let customEmotesAddButton = document.createElement('div');
	customEmotesAddButton.id = 'add-emote';
	customEmotesAddButton.textContent = 'Add';

	customEmotesCategoryName.appendChild(customEmotesAddButton);

	customEmotesCategory.appendChild(customEmotesCategoryName);

	emotesListContainer.appendChild(customEmotesCategory);

	emotesList.setAttribute('hidden', true);

	emotesList.appendChild(title);

	emotesList.appendChild(emotesListContainer);

	/* https://stackoverflow.com/a/4384173 */
	function insertAtCaret(element, text) {

		if (document.selection) {

			element.focus();
			let sel = document.selection.createRange();
			sel.text = text;
			element.focus();

		} else if (element.selectionStart || element.selectionStart === 0) {

			let startPos = element.selectionStart;
			let endPos = element.selectionEnd;
			let scrollTop = element.scrollTop;
			element.value = element.value.substring(0, startPos) +
				text + element.value.substring(endPos, element.value.length);
			element.focus();
			element.selectionStart = startPos + text.length;
			element.selectionEnd = startPos + text.length;
			element.scrollTop = scrollTop;

		} else {

			element.value += text;
			element.focus();

		}

	}

	class DiscordEmoji {

		constructor(id, name, categoryName = 'Other', rightClickFunction = () => {}) {

			this.name = name;
			this.id = id;
			this.categoryName = categoryName;
			this.buttonElement = document.createElement('button');
			this.buttonElement.id = 'emote-button';

			this.buttonElement.style.backgroundImage = `url('https://cdn.discordapp.com/emojis/${this.id}.png?v=1')`;
			try {
				tooltip(this.buttonElement, `:${this.name}:`);
			} catch (err) {
				this.buttonElement.title = `:${this.name}:`;
			}

			this.buttonElement.onclick = () => insertToChat(this.name, this.id);

			this.buttonElement.oncontextmenu = rightClickFunction;

		}

		insert(elementWithCategories = emotesListContainer) {

			let foundCategory = false;
			if (elementWithCategories.childNodes) {

				if (elementWithCategories.childNodes.forEach) elementWithCategories.childNodes.forEach(e => {

					if (e.getAttribute('categoryName') == this.categoryName) {

						foundCategory = true;
						e.appendChild(this.buttonElement);

					}

				});

			}


			if (!foundCategory) {

				let categoryElement = document.createElement('div');
				categoryElement.setAttribute('categoryName', this.categoryName);

				let categoryTitle = document.createElement('div');
				categoryTitle.id = 'category-title';
				categoryTitle.textContent = this.categoryName;

				categoryElement.appendChild(categoryTitle);
				categoryElement.appendChild(this.buttonElement);

				elementWithCategories.appendChild(categoryElement);

			}

		}

		takeOut() {

			let parentNode = this.buttonElement.parentNode;

			parentNode.removeChild(this.buttonElement);
			if (parentNode.childNodes.length < 2) parentNode.parentNode.removeChild(parentNode);

		}

	}

	let discordEmojis = [],
		customEmojis = [];

	try {

		JSON.parse(localStor.getItem('custom-emotes'));

	} catch (err) {

		localStor.removeItem('custom-emotes');

	}

	let customEmojisData = localStor.getItem('custom-emotes') == null ? {} : JSON.parse(localStor.getItem('custom-emotes'));

	let readData = () => {

		try {

			JSON.parse(localStor.getItem('custom-emotes'));

		} catch (err) {

			localStor.removeItem('custom-emotes');

		}

		customEmojisData = localStor.getItem('custom-emotes') == null ? {} : JSON.parse(localStor.getItem('custom-emotes'));

	};
	let saveData = () => localStor.setItem('custom-emotes', JSON.stringify(customEmojisData));

	let checkIfEmoteIdExists = id => [...discordEmojis.map(e => e.id), ...customEmojis.map(e => e.id)].includes(id);

	let insertToChat = (name, id) => {

		if (chatInput.value.length + name.length + id.length + 4 > chatInput.maxLength) {

			alert(`Limit exceeded, Max limit is ${chatInput.maxLength}.`);
			return false;

		} else {

			insertAtCaret(chatInput, `<:${name}:${id}>`);
			return true;

		}

	};

	let removeAllNormalEmotes = () => {

		if (discordEmojis.length > 0) {

			if (discordEmojis.forEach) discordEmojis.forEach(e => {

				e.takeOut();

			});

			discordEmojis = [];

		}

	};

	let updateEmotes = async () => {

		removeAllNormalEmotes();

		try {

			discordEmojisList = JSON.parse(JSON.stringify(await fetch(`https://cors-anywhere.herokuapp.com/https://opm-emotes.glitch.me/api/defaultemotes?d=` + Date.now(), {
				method: 'GET'
			}).then(response => response.json())));

		} catch (err) {
		}

		if (Object.keys(discordEmojisList).forEach) Object.keys(discordEmojisList).forEach(category => {

			if (Object.keys(discordEmojisList[category]).forEach) Object.keys(discordEmojisList[category]).forEach(emoji => {

				let discordEmoji = new DiscordEmoji(emoji, discordEmojisList[category][emoji].name, category);

				discordEmoji.insert(emotesListContainer);
				discordEmojis.push(discordEmoji);

			});

		});

		emotesListContainer.appendChild(customEmotesCategory);

	};

	let addCustomEmote = (name, id) => {

		if (!checkIfEmoteIdExists(id) && typeof customEmojisData[id] !== 'object') {

			customEmojisData[id] = {
				'name': name
			};
			saveData();

		}

	};

	let updateCustomEmotes = () => {

		if (customEmotesCategory.childNodes) {

			let childNodes = [...customEmotesCategory.childNodes];

			if (childNodes.forEach) {

				childNodes.forEach(customEmojiButton => {

					if (customEmojiButton.id == 'emote-button') customEmotesCategory.removeChild(customEmojiButton);

				});

			}
		}

		customEmojis = [];

		if (Object.keys(customEmojisData).forEach) Object.keys(customEmojisData).forEach(emojiId => {

			let customEmoji = new DiscordEmoji(emojiId, customEmojisData[emojiId].name, 'Custom', () => {

				if (typeof customEmojisData[emojiId] == 'object') {

					delete customEmojisData[emojiId];
					customEmojis = customEmojis.filter(e => e.id !== emojiId);
					saveData();
					return false;

				}
				customEmotesCategory.removeChild(customEmoji.buttonElement);

			});

			customEmotesCategory.appendChild(customEmoji.buttonElement);
			customEmojis.push(customEmoji);

		});

	};

	let promptForEmoji = () => {

		let emojiId;
		do emojiId = prompt('Please enter the emote ID.', ''); while (!/^\d+$/.test(emojiId) && emojiId !== null);

		if (emojiId !== null) {

			let emojiName;
			do emojiName = prompt('Please enter the emote name.', ''); while (emojiName == '' && emojiName !== null);

			if (emojiName !== null) {

				if (!checkIfEmoteIdExists(emojiId)) {

					addCustomEmote(emojiName, emojiId);
					updateCustomEmotes();

				} else alert('The emote you provided already exists!');

			}

		}

	};

	let isEmotesListHidden = true;

	let emotesButtonClick = () => {

		setTimeout(() => {

			isEmotesListHidden = !isEmotesListHidden;
			emotesList.setAttribute('hidden', isEmotesListHidden);

		}, 50);

	};

	let mouseDownFunction = () => {

		if (!(emotesList.matches(':hover') || emotesButton.matches(':hover')) && !isEmotesListHidden) emotesButtonClick();

	};

	let resize = () => {

		if (emotesList.style.left !== `${emotesButton.offsetLeft - emotesList.offsetWidth + emotesButton.offsetWidth}px`) emotesList.style.left = `${emotesButton.offsetLeft - emotesList.offsetWidth + emotesButton.offsetWidth}px`;

	};

	customEmotesAddButton.addEventListener('mousedown', promptForEmoji, {
		passive: true
	});
	customEmotesAddButton.addEventListener('touchstart', promptForEmoji, {
		passive: true
	});

	emotesButton.addEventListener('mousedown', emotesButtonClick, {
		passive: true
	});
	emotesButton.addEventListener('touchstart', emotesButtonClick, {
		passive: true
	});

	let resizeIntervalNumber = -1,
		refreshIntervalNumber = -1;

	let emotesCSS = `
	#chat-input {
		margin-right: 26px;
	}
	#chat > #emote-button {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	#emote-button {
		width: 26px;
		height: 26px;
		z-index: 0;
		background-color: #666;
		border: 0;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAACACAIAAABGLJqLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUCSURBVHhe7dzdLmtbGMZxszpXadnhnPhIg7gSiQsQB0KQEIlwKUQiojggcScOJFyEOCAOmyot7VrvNt7IyvbRd9hreMbefX4H3dPac3SO+e/U1Y7VNJmenu7AaTabuVxufX29v7+/0WgkSaL/438to/+lb8ToAIwOwOgAjA7A6ACMDsDoAIwOwOgAjA7A6ACZxED3NdNhNjrGx8/I6LTMkqmpKd38WGdnp27ZNBoN3WpFZvzjx4/NzU2vVcZMJq5f0GazqVs2yczMjG5+QLpUq1X74ynh8vm8MZ+Lvri42NfXZ49+f3//hesrEJlJd3d3NpvVnw2Ss7Mz3XxD7k6u8XK5vLe39/j4KNufn6oke35+LhQKq6urPT099ojS3binkMuqVCrd3t6maap/BFWv1+fm5sbHx2XD+CuYXF5e6uYbr9G3trbs0SX3xsaGV/TP7/YfJPrOzs7NzY08VF4DQ5ATrNVqS0tLk5OT9ugZOYfP2Z+gX8kQHWyjw8zk3OQKcLcx0GmZ4V+9CB3mw13jchsDNyU7vk4HYHQARgdgdABGB2B0AEYHYHQARgcwRX993+g2PvL7nqH9friW3BA7HWamw8xM0Z9fNBoNt/ER2cHto8OCcUdxtxa+79Tt9+zoMLPk4uJCN9+QuXa+rDIeHBzUajXLQ9psNvP5/PLystcqoxc5xNHR0d3dnX0J++HhwWsyXV1dcueWh0rus16vz87Ojo2NeSztfhLdkWNLcf3BJpfLhcj9SuYj6Y2HkN0ODw+vr69lVi07ys5PT0/z8/Ojo6OyYTmE3KfcszG30zq68C1ouUb+Da/5yM67u7tXV1f26CsrK8ViUa5c44F8z9f0+Py95u1DhwWjhzHTYWYyRJ6O3FgLHWbm8erFTocFo4ex0TGe3EB3Dy25IXYez0T0pzA6AKMDMDoAowMwOgCjAzA6AKMDtEV0feNo4HZ2o8Jpi+j29XG3Z+gFu7aIXigU/rLp7e2VW68Pm3+BaWn3v65Wq9n/EUMu866uLq/1cV9tEd33aZpPL3+ALnub6bBg+OrlHTosmLaIHhtGB2B0AEYHYHQARgdgdABGB2B0gCDRf0ZGpxWNIAte7s10PGcbW/fk/PxcNz/m9Z0DcoaPj49RnWfopVpfyenpqW6+R9pls9mRkRHLpGVn2a1arZZKpUqlYvxcfWgyh4WFhYGBAePnzb9Bcnx8rJvvkRmnaVosFu3R7+/vt7e3y+VyPNHX1taGhobiid7iq0d0L0/ydCTF3W0MvnwigQR89fK6AedmFY+I/nppH4wOwOgAjA7A6ACMDsDoAIwOwOgAjA5gim5ch3G7CXnnrZ8KjIPOLxrJycmJbr5HZpym6cjISGerr5QWsoNb2t3f369UKl6r8OHIrJaWlgYHByNa2v08uuP7jxgPDw8tH6HvNDExUSgUvL5nJyhTdN+CkZzbK/lNzefz8UT3eE63kwcpKnoa0Qjy6kXbx0HnFBO+ZARgdABGB2B0AEYHYHQARgdgdABGB2B0gCii6xJJMHqYaEQRvTOkbOAvb/kC09JuOHIZZjKZ4eHhNE3DXZKSPqqVryiudLkYJfrLp5qDiG2tMaLndP2hDfDVCwCjAzA6AKMDMDoAowMwOgCjAzA6AKMDMDoAowMwOgCjAzA6AKMDMDoAowMwOgCjAzA6AKMDMDoAowMwOgCjAzA6AKMDMPq36+j4BaEdFh5GrTtLAAAAAElFTkSuQmCC');
		background-position: center;
		background-size: 23px;
		background-repeat: no-repeat;
		-moz-pointer-events: all;
		-webkit-pointer-events: all;
		pointer-events: all;
	}
	#emotes-list {
		color: #fff;
		line-height: ${(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 15 : 16}px;
		text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
		border: 5px solid #aba389;
		border-image: url(/img/small_border.png) 5 repeat;
		-o-border-image: url(/img/small_border.png) 5 repeat;
		border-image-outset: 1px;
		background-color: #7e635c;
		display: block;
		position: fixed;
		-moz-box-shadow: 0 0 5px #000;
		-webkit-box-shadow: 0 0 5px #000;
		box-shadow: 0 0 5px #000;
		bottom: 32px;
		opacity: 1;
	}
	#emotes-list[hidden=true] {
		opacity: 0;
		-moz-pointer-events: none;
		-webkit-pointer-events: none;
		pointer-events: none;
		margin-left: -250%;
	}
	#emotes-list:before {
		content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAKCAYAAABv7tTEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAABeSURBVChTncu7DcAgEIPhW4k6M2QDuuyRnjlSZkhHjmR0wKE8kP6Ckz/bt4yv/UPnUcDWtIQDn7bG8RvoN8b3BAcA4G4G/U3bilgPI8AaxPw4Aqz5KMEIsOGgZgCAXcUCQWC8sAQGAAAAAElFTkSuQmCC);
		bottom: -1${(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 3 : 4}px;
		display: block;
		right: 1px;
		position: absolute;
	}
	#emotes-container #emote-button {
		position: relative;
		background-color: rgba(0, 0, 0, 0);
		cursor: pointer;
		background-size: contain;
	}
	#emotes-container #emote-button:hover {
		background-color: #4d313b;
		border-radius: 4px;
	}
	#emotes-container {
		max-width: 285px;
		min-width: 285px;
		overflow-y: scroll;
		max-height: 166px;
	}
	#emotes-title, #category-title {
		padding: 3px 0;
		border-bottom: 1px solid #4d313b;
		margin-bottom: 3px;
		text-align: center;
	}
	#category-title { border-top: 1px solid #4d313b; }
	#emotes-container > [categoryname]:first-child > #category-title { border-top: 0; }
	#add-emote {
		float: right;
		background: none;
		border: 0;
		border-left: 1px solid #4d313b;
		text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
		color: #fff;
		font: 16px pixel-op, sans-serif;
		padding: 3px 8px;
		margin-top: -3px;
		cursor: pointer;
	}
	#add-emote:hover { background: #4d313b; }
	`;

	if (style.styleSheet) style.styleSheet.cssText = emotesCSS;
	else style.appendChild(document.createTextNode(emotesCSS));

	let emoteContextMenuFunction = function (t) {
		let thisElement = this;
		if (isInstalled) context.createContextMenu(t.clientX, t.clientY, [
			['Add this emote', function () {

				let emojiId = typeof thisElement.src == 'string' ? thisElement.src.split('emojis/')[1].split('.png')[0].replace(/\D/gm, '') : 'undefined';
				let emojiName = thisElement.title;

				if (!checkIfEmoteIdExists(emojiId)) {

					addCustomEmote(emojiName, emojiId);
					updateCustomEmotes();

				} else alert('This emote already exists!');

			}]
		]);
	};

	let messageEvent = () => setTimeout(() => refreshEmoteContextMenus, 50);

	let refreshEmoteContextMenus = () => {

		document.querySelectorAll(`#${chatMessages.id.split(' ')[0]} img.emote`).forEach(element => {
			element.removeEventListener('click', emoteContextMenuFunction);
			element.addEventListener('click', emoteContextMenuFunction);
		});
		/*chatMessages.childNodes.forEach(elem => {
			if (elem.childNodes !== null) elem.childNodes.forEach(element => {
				if (element.childNodes !== null) element.childNodes.forEach(element2 => {
					if (element2 !== null) {
						if (typeof element2.className == 'string') if (element2.className.startsWith('emote')) {
							element2.removeEventListener('click', emoteContextMenuFunction);
							element2.addEventListener('click', emoteContextMenuFunction);
						}
					}
				});
			});
		});*/

	};

	async function install() {

		isInstalled = true;

		head.appendChild(style);

		body.appendChild(emotesList);

		chat.appendChild(emotesButton);

		body.addEventListener('mousedown', mouseDownFunction, {
			passive: true
		});
		body.addEventListener('touchstart', mouseDownFunction, {
			passive: true
		});

		body.addEventListener('resize', resize);

		if (resizeIntervalNumber < 0) resizeIntervalNumber = setInterval(resize, 250);
		if (refreshIntervalNumber < 0) refreshIntervalNumber = setInterval(refreshEmoteContextMenus, 10000);

		updateEmotes();
		updateCustomEmotes();

		coreChat.on('message', messageEvent);

		refreshEmoteContextMenus();

	}

	function uninstall() {

		isInstalled = false;

		body.removeEventListener('mousedown', mouseDownFunction, {
			passive: true
		});
		body.removeEventListener('touchstart', mouseDownFunction, {
			passive: true
		});

		body.removeEventListener('resize', resize);

		head.removeChild(style);

		if (style.parentNode !== null) style.parentNode.removeChild(style);

		emotesButton.parentNode.removeChild(emotesButton);

		emotesList.parentNode.removeChild(emotesList);

		if (resizeIntervalNumber > -1) {
			clearInterval(resizeIntervalNumber);
			resizeIntervalNumber = -1;
		}
		if (refreshIntervalNumber > -1) {
			clearInterval(refreshIntervalNumber);
			refreshIntervalNumber = -1;
		}

		coreChat.off('message', messageEvent);

	}

	return {

		install: install,
		uninstall: uninstall,

		DiscordEmoji: DiscordEmoji,

		updateEmotes: updateEmotes,
		updateCustomEmotes: updateCustomEmotes,

		addCustomEmote: addCustomEmote,

		checkIfEmoteIdExists: checkIfEmoteIdExists,

		customEmojisData: {

			read: readData,
			save: saveData,
			get: () => customEmojisData

		},

		getIsInstalled: () => isInstalled

	};

})();
