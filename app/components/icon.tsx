
import * as React from 'react'

interface Props {
  i: string,
  big?: boolean,
  highlight?: boolean
}

export const Icon: React.SFC<Props> = (props) => {
  return <svg className={`icon${props.big ? " icon--big" : ""}${props.highlight ? " highlight" : ""}`} viewBox={props.i === 'logo' ? '0 0 203 222' : '0 0 512 512'}>
    {({
      logo: <path d="M195.188617,109.065095 C198.347538,113.4881 198.216049,119.702329 194.836383,124.923578 C194.729028,125.092645 184.165575,141.779999 180.398363,147.556956 L180.415221,147.570056 C180.368907,147.629717 180.32348,147.704956 180.281603,147.769573 C176.76477,153.184674 169.858866,156.698611 162.687855,156.698611 L117.294287,156.698611 C106.172052,156.698611 97.4593773,149.170616 97.4593773,139.560176 C97.4593773,130.144827 106.200799,122.769611 117.360298,122.769611 L144.895899,122.769611 C145.758117,122.769611 146.616076,122.236033 147.063598,121.605616 L147.063598,121.6543 C147.063598,121.650052 147.045499,121.669348 147.04887,121.6651 C147.090925,121.610396 147.119672,121.566846 147.157468,121.509133 C147.160307,121.50453 147.157823,121.521171 147.16084,121.516745 L157.282803,105.8052 L177.417954,105.8052 C182.00728,105.8052 186.310561,104.673779 190.022409,102.7342 C192.144149,105.277463 194.611912,108.257822 195.188617,109.065095 L195.188617,109.065095 Z M171.633696,160.572104 C169.881757,163.171664 168.238415,165.700056 167.034611,167.533415 C166.956889,167.651674 166.883248,167.756655 166.801977,167.880755 L166.811737,167.883056 C163.234571,173.106784 156.713196,176.34154 149.657704,176.34154 L104.33405,176.34154 C93.1915862,176.34154 84.4636509,168.870549 84.4636509,159.351989 C84.4636509,153.493243 87.7808554,148.412382 92.931803,145.378913 C94.0690643,149.24621 96.3356019,152.778913 99.5922969,155.6311 C104.314354,159.767133 110.600966,162.055822 117.294287,162.055822 L153.77573,162.055822 L171.633696,160.572104 Z M140.875647,207.119521 C137.114824,212.909224 130.494078,216.520707 123.596515,216.520707 L77.7628764,216.520707 C69.9356649,216.520707 63.3049822,212.798047 60.0511264,207.270884 C60.0062322,207.171391 59.9570792,207.065702 59.8988764,206.969927 L59.7200093,206.671626 C58.5504524,204.478181 57.8978003,202.020779 57.8978003,199.40865 C57.8978003,193.253372 61.6057444,187.968214 67.2712899,185.032291 C68.3604629,189.088836 70.6821867,192.802822 74.0771133,195.781233 C78.8107042,199.933377 85.1031719,202.234812 91.7954288,202.234812 L136.626666,202.234812 C139.549049,202.234812 142.418554,201.730621 145.117531,200.820138 C142.786403,204.285037 140.943432,207.01808 140.901377,207.08075 C140.892682,207.09332 140.88381,207.10642 140.875647,207.119521 L140.875647,207.119521 Z M153.836772,187.781621 C153.805541,187.828712 153.769874,187.882707 153.737578,187.931568 C153.693926,187.997425 153.64637,188.075143 153.602008,188.140468 C149.937184,193.527066 143.475609,196.877602 136.626666,196.877602 L91.7954288,196.877602 C80.8421238,196.877602 71.9308851,189.152214 71.9308851,179.67508 C71.9308851,173.971238 75.1623825,168.91764 80.1220416,165.789458 C83.1730748,175.081592 92.7179787,181.69875 104.33405,181.69875 L139.518528,181.69875 L149.657704,181.69875 C152.845904,181.69875 155.952301,181.135076 158.84097,180.130942 C156.933941,183.066511 155.13622,185.812478 153.836772,187.781621 L153.836772,187.781621 Z M7.5901771,120.777808 C4.51305909,115.735894 4.59947605,109.754817 7.81606783,104.786903 L56.8749927,29.463401 C60.6895827,23.9470373 67.4123607,20.9666785 74.2694664,21.0906019 L60.9470591,41.2964967 C60.1316876,42.5325445 60.4764682,44.1940038 61.7146972,45.0062335 C62.9534586,45.8193483 64.618449,45.4762574 65.4331107,44.2402096 L66.4012645,42.7718938 L85.5270941,13.7789416 C88.9669149,8.49661627 95.460608,5.35763541 102.897612,5.35763541 L138.322177,5.35763541 C148.519023,5.35763541 156.942104,12.1231474 158.061975,20.7999129 C156.059125,20.3367933 153.961162,20.0898316 151.800383,20.0898316 L116.322052,20.0898316 C107.087149,20.0898316 98.9265136,24.1405349 94.4993747,30.9395062 L86.6902628,42.8021665 L74.4577383,61.3919225 C73.6436089,62.6288555 73.9896316,64.2880134 75.2289253,65.0988268 C76.4687514,65.9107024 78.1332094,65.56531 78.9468065,64.3285541 L79.9114114,62.8620086 L98.9953633,33.8687024 C102.435184,28.586377 108.912375,25.4470421 116.322052,25.4470421 L151.800383,25.4470421 C162.089325,25.4470421 170.575754,32.3352383 171.571412,41.1253053 C169.291744,40.5131234 166.880231,40.1794153 164.383012,40.1794153 L148.171581,40.1794153 L128.904681,40.1794153 C119.662325,40.1794153 111.496721,44.2301187 107.069582,51.0282048 L99.255324,62.890511 L87.0146369,81.4806211 C86.1996203,82.7179081 86.5452881,84.3761809 87.7847593,85.1880565 C89.0242304,86.0001091 90.6888659,85.6552478 91.5029953,84.4188459 L92.4686649,82.9514153 L111.564861,53.9581091 C115.004859,48.6759608 121.487195,45.5366258 128.904681,45.5366258 L148.171581,45.5366258 L164.383012,45.5366258 C174.625994,45.5366258 183.081548,52.3630373 184.139845,61.0962766 C181.996811,60.5609273 179.742872,60.268822 177.413695,60.268822 L161.64961,60.268822 L141.935364,60.268822 C132.414061,60.268822 124.46441,64.0768124 120.139481,70.718401 L111.970683,82.9802718 L100.116299,100.781875 C99.2950722,102.014382 99.6322226,103.674779 100.867258,104.493205 C102.102292,105.311454 103.768525,104.975267 104.58922,103.74276 L104.873668,103.315224 L124.627485,73.6599895 C127.958175,68.5453148 134.266613,65.6260325 141.935364,65.6260325 L161.64961,65.6260325 L177.413695,65.6260325 C188.370195,65.6260325 197.283917,73.4218794 197.283917,83.0222287 C197.283917,88.7466067 194.114704,93.8258746 189.234187,97.0011474 C189.195148,97.0252239 189.155577,97.0590373 189.117426,97.0850612 C185.833049,99.1901665 181.789375,100.447989 177.417954,100.447989 L155.816199,100.447989 C154.902522,100.447989 154.051306,100.911817 153.556937,101.67908 L143.42823,117.412401 L138.496253,117.412401 L117.360298,117.412401 C103.190046,117.412401 92.0896369,127.125875 92.0896369,139.545482 C92.0896369,139.614348 92.094428,139.675248 92.0951378,139.744114 C84.2849612,143.495277 79.0939105,150.780736 79.0939105,159.341013 C79.0939105,159.608334 79.1059769,159.870698 79.115914,160.13554 C77.3015128,161.073109 75.6086631,162.215152 74.0801299,163.555827 C69.2908205,167.755592 66.6317689,173.387913 66.567178,179.436085 C59.4550801,182.464774 54.3144245,188.329894 52.9159603,195.465583 L52.3082024,194.464812 L7.5901771,120.777808 Z M81.0327024,10.8477981 L77.6242899,16.0097407 C67.9413318,14.727133 57.8676343,18.5657502 52.4301089,26.46109 C52.4169778,26.4798555 52.404379,26.4972048 52.3916028,26.5163244 L3.30943234,101.874702 C-0.990654196,108.516291 -1.10723724,116.826774 3.00014126,123.558473 L47.71515,197.240167 L55.3065337,209.738908 C55.3070661,209.739616 55.307421,209.740147 55.3079533,209.740678 C56.520275,211.840827 58.1075434,213.788726 60.0514813,215.481875 C64.7763773,219.597018 71.0663607,221.877918 77.7628764,221.877918 L123.596515,221.877918 C132.286121,221.877918 140.625979,217.338248 145.368265,210.053497 C145.754923,209.480085 154.797118,196.063248 158.109531,191.05621 C158.183882,190.945918 158.260007,190.833324 158.332405,190.721616 C158.340568,190.709047 158.345714,190.693999 158.353522,190.68143 C160.188507,187.899171 162.980999,183.595841 165.682993,179.432899 C167.772438,176.212482 169.792678,173.100056 171.25662,170.865363 C171.356168,170.719841 171.464056,170.579808 171.560056,170.431985 C171.598562,170.372856 171.627308,170.310363 171.660491,170.249286 C173.24563,167.83986 175.607457,164.338846 177.895643,160.947415 C180.245581,157.463927 182.667385,153.874396 184.355089,151.309181 C184.502903,151.09798 184.647345,150.8843 184.787883,150.667966 C184.812726,150.629372 184.830293,150.588655 184.853007,150.549353 C188.603538,144.802846 199.268491,127.954391 199.361828,127.8071 C201.680181,124.225889 202.841575,120.252903 202.841575,116.39375 C202.84122,112.652678 201.749208,109.018004 199.561102,105.955678 C198.852199,104.962875 196.313989,101.889927 194.517155,99.7333053 C199.515853,95.5703627 202.629348,89.6142478 202.629348,83.0075349 C202.629348,74.4463722 197.180998,66.9767981 189.573999,63.0891426 L189.573999,62.9181282 C189.573999,54.5228459 184.531294,47.1794967 177.014793,43.2318268 C177.014793,43.0967502 177.027747,42.9650373 177.027747,42.8285445 C177.027747,34.1038029 171.56254,26.5280086 163.554864,22.7067407 C163.52665,10.1741856 152.221999,0.000424880383 138.322177,0.000424880383 L102.897612,0.000424880383 C93.6353825,0.000424880383 85.4582444,4.05112823 81.0327024,10.8477981 L81.0327024,10.8477981 Z" />,
      facebook: <path d='m451 37c7 0 13 2 17 7 5 4 7 10 7 17l0 390c0 7-2 13-7 17-4 5-10 7-17 7l-112 0 0-170 57 0 9-66-66 0 0-42c0-11 3-19 7-24 5-5 13-8 26-8l35 0 0-60c-12-1-29-2-51-2-26 0-46 7-62 23-15 15-23 36-23 64l0 49-57 0 0 66 57 0 0 170-210 0c-7 0-13-2-17-7-5-4-7-10-7-17l0-390c0-7 2-13 7-17 4-5 10-7 17-7z'/>,
      twitter: <path d='m481 117c-13 18-28 34-46 47 0 3 0 7 0 12 0 25-3 50-11 74-7 25-18 49-33 71-14 23-32 43-52 61-21 17-45 31-74 41-29 11-60 16-92 16-52 0-99-14-142-42 7 1 14 2 22 2 43 0 81-14 115-40-20 0-38-6-54-18-16-12-27-27-33-46 7 1 13 2 18 2 8 0 16-1 24-4-21-4-39-15-53-31-14-17-21-37-21-59l0-1c13 7 27 11 42 11-13-8-23-19-30-32-8-14-11-29-11-44 0-17 4-33 12-47 23 28 51 51 84 68 33 17 69 27 107 29-2-8-3-15-3-22 0-25 9-47 27-65 18-18 40-27 66-27 26 0 49 10 67 29 21-4 40-11 59-22-7 22-21 39-41 51 18-2 35-7 53-14z'/>,
      instagram: <path d='m152 511c-30-1-59-7-85-23-33-20-54-51-61-90-4-23-5-47-6-71 0-50 0-101 1-152 0-27 1-54 10-79 17-50 52-80 103-90 23-4 47-5 70-6 51 0 102 0 153 1 27 0 53 1 79 10 50 17 80 52 90 103 4 23 5 47 6 71 0 50 0 101-1 152 0 27-1 54-10 79-17 50-52 80-103 90-23 4-47 5-70 6-24 1-141 0-176-1m314-259c0-20 0-41 0-61-1-19-2-39-4-58-4-43-30-73-72-81-23-4-47-5-70-5-43-1-85-1-128 0-22 0-44 1-66 4-37 6-62 27-72 64-4 11-6 24-6 36-1 46-2 93-2 139 1 30 1 59 4 89 4 43 30 73 72 81 23 4 47 5 70 5 43 1 85 1 128 1 20-1 39-2 59-4 18-2 35-7 50-19 24-19 33-45 34-74 2-39 3-117 3-117m-210 135c-73 0-131-58-131-132 0-73 59-131 133-130 72 0 130 59 129 133 0 71-59 129-131 129m0-46c47 0 85-38 85-85 0-47-38-85-85-85-47 0-85 38-85 85 0 47 38 85 85 85m137-252c17 0 31 13 30 31 0 17-14 31-31 30-17 0-31-14-30-31 0-17 14-30 31-30'/>,
      mail: <path d='m0 64l0 384l512 0l0-384z m450 32l-194 156l-194-156z m-418 320l0-303l224 179l224-179l0 303z'/>
    } as any)[props.i]}
  </svg>
}