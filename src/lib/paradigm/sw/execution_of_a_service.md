[*<-- Rudi kwenye ukurasa mkuu*](README.md#system-behavior)


### Mchoro wa mfuatano wa utekelezaji wa kielelezo cha huduma

![Mchoro wa hali ya matumizi](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Mchoro e29__: mchoro wa mfuatano wa utekelezaji wa kielelezo cha huduma*

<br>

Mawakala wanaoshiriki katika mchoro wa mfuatano ulio hapo juu (mchoro e29) ni kama ifuatavyo:

- Huduma kuu: hiki ni kielelezo cha huduma kinachoomba kuanzisha kielelezo cha huduma nyingine kwenye nodi yake.

- Nodi: hii ni nodi ambayo huduma kuu inaiomba kuzalisha kielelezo kipya.

- Utegemezi: hiki ni kielelezo kipya ambacho huduma kuu ilitaka kukitumia.

<br>

Mwingiliano ufuatao unatokea wakati wa mfuatano:

1. Kielelezo cha huduma kuu kinatuma vipimo vya huduma nyingine kwa nodi yake kwa kutumia mbinu ya *StartService()*. Hii inadhania kwamba nodi itashughulikia kutekeleza kielelezo cha huduma hii na kurudisha anwani ya kielelezo kipya, pamoja na tokeni husika.

2. Nodi, baada ya kupokea ombi kutoka kwa huduma kuu, inahifadhi vipimo kamili au, ikiwa tayari vimehifadhiwa, inasimamisha mtiririko wa ombi (ili kupata hashi tu ya huduma iliyoombwa).

3. Nodi inaanzisha kielelezo cha huduma iliyoombwa, ikipakia mipangilio (faili ya *__config __* iliyo kwenye mzizi wake) na kutekeleza sehemu yake ya kuanzia.

4. Utegemezi unaanza na utekelezaji ulioelezwa kwenye sehemu ya kuanzia ya vipimo vyake.

5. Nodi inapata anwani ya kielelezo cha chombo na kuhesabu tokeni husika; tokeni hii itakuwa kitambulisho cha siri cha kielelezo kipya cha huduma na inategemea utekelezaji wa nodi. ~~Nodi inahifadhi kielelezo kwenye orodha ya usajili kama kielelezo cha ndani, na huduma iliyokiomba kama mzazi wake.~~ Mwishoni, inarudisha anwani na tokeni ya kielelezo kwa huduma kuu.

6. Huduma kuu, anayeomba kielelezo, anatumia utegemezi kupitia anwani ambayo nodi imempatia.

7. Huduma kuu inaamua kusimamisha utegemezi, hivyo inatekeleza mbinu ya *StopService()* ya nodi, ikiituma tokeni ya utegemezi.

8. Nodi inasimamisha chombo cha utegemezi na kukiondoa kwenye orodha ya usajili.

>Mbinu za *StartService()* na *StopService()* ni mbinu za rejea, lakini zinaweza kutofautiana kati ya utekelezaji wa nodi. Kiunganishi cha nodi, kinachotumiwa na wateja na huduma za ndani (huduma zinazoendeshwa kwenye nodi) kufanya maombi na kudhibiti rasilimali na utegemezi, kinatolewa na nodi kwa wateja wapya au huduma za ndani.

>Faili ya *__ config __* inaonyesha mipangilio ya kila huduma (vigezo vya mazingira, kiunganishi cha nodi, n.k.), ambayo inategemea kila huduma, kwa kuwa muundo wake unaonyeshwa kwenye vipimo vya kila mmoja. Nodi inaweza kuwa na uwezo wa kuandika kwenye muundo mmoja au zaidi, na ikiwa hailingani, inaweza kuamua kutokianzisha huduma hiyo au kutumia huduma ya kutafsiri.
