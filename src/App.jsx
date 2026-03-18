import React, { useState, useRef, useMemo } from "react";

const TIKIT_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAYAAACHjumMAABZDklEQVR42u29ebxtV1Xn+xtjrrV2e7p7z703uWkIIUEgCW0aAtKIgpaWVtVDrAJLtKoU0JICHuUrkB4UFNtSFEVAlEqBHZaAIqXSq7QhgUAIISQh7W1Pu7u11hzj/THnXHvtc6E+r4n1Oej48jnk3HPP3mefdfcca7S/ARiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRjfPJBdgm+yfzCi5uMb/f0i+g2fS/XrPb79ttD/x49b/Nl6xttMWw9a/Bn/K7T5eenxqrrwXIYZGOP/tREBiBjMDgDgaw+FgqCwoxWuDQA4RwAIIhKNkNjFMQNjfGPPhEFE8L4+4x8peAeKc845G+vr67jfBfd7dZEXznufiYhzGVOn06Esz4iJwUQkqlCZH0hRD2g0UgqMxyOMRiP0+wN0u10oFFmeg5lb3ooufK4i2NzaxO7uCL1eF0VewNcevV4P/X4fxASJj0kejYigqiqMx2OoKobDIYqiA2aK3tD8/5hYRUVFRInIq0p9xx13+LvvvvflTA5bW1u45957IV7OeCs7l0FVIOLtDWUGxkiHkJnh/fxQOM7wiEc+FBddfOHLH/3oK4pHPuLhRZ5nOaD50XOOZsvLw7xTFBkRZwp1BDj1nvI8J8dMIIImG6EEYgZA8HXV+lcneO9R1zWyLAtGhbAQfgXjEv4sIqBoBbyv4WsPlzkQHFQAdozMORBT8LRU5oYNBBGFiAeBwMRwzMFVU40xE7XjIlXUCqhXwM9m03o2rWrmrNra2q7vvffeajqdVtd+5vry4x//ZPnpz1z76q/cfMsZ11TEw6IpMzD/ZHHORfdeMRj2cdlll+BJT3rCa77rKd/ev/SyS7rLy4OuQouq9EXty5yZs+l0nKkgI6XMi3d1VTnnHBMpEwHMjoiCt6IgqCiIHEQ0/kyGKsBEUA4HnwgQUQTHRRfyLEQOgMJ7DyKCc24hR8NgOJehjsaLQCBI8z1EBB/facwu2BSvzQ+gPZ6Sqiozw0MkPBF5ZvJEXEO5do7rPC9qIqqKTrf0IuXG6Y3pTTd9efL+9//N+C/+4v0vv/YznwWAGGIqRCx0MgPzTyyHwBw8CHaEZz/7R1/2Yz/275bvd8E5g8GgO6hm4950OusSUbeuJeeskxM0U/WZiHeMzDHYKeCIwACYc0ciQgQCEUilDs4BCCCeH30VOHYgIigRvHioavBcED5nZkCDqSFyICB6WARQ+At24TkYFN5FTfKVoBJ+RnqHKSGGTcGwMHF4XdD4+igagfCKmUiVSKOlEgU8AV4VXkS8qtYKrSuZVcxcOZdPh4PBtMi6453RePSZT1+/88u//Gvb73n3e18LAJnL4OP1MMzA/KMmyxzqOoRDT/y2x/30i170gtXHPe6xq2U5XSqn4yER98nlXah22LlCVTNRzZgoU/UML46ZWUSYiJiZiZjZk5KIQBG8k+YfWGnBm2iMSfye5JmE/Mf8HSEiMSfEyECoRSDpzCuB2CULFB6oc68kPDaEKUQUPCkNSWqoRP+GgweUvqd1+pkZJKqqKkKkzCRQCEASDYwwUe21qomoJqJSVaciOs2yYtTvDXZVaftv/uZDG694+c/+9Cc/9Uk4ZhABtTdvxgzMP+KQyHuP9fWDeNWrX/bqZ/zg0w46R2u7OzsrzDTMgL4S9SjLC8dceO8zBZyKOACOCcQAExFVVUXOOW5ywI7BxBARIg4egajCuTx8LhLDGzRGJhmYdMj3JmaJCVCgIAevAiEgpmogGn6Gy7IU4zSGJeVs0vNKTLOohARsSAQT2hV1F/M1zKwiAlLAOadeRVVVgusEJSLREO95hOjLi0gVjAxKAk289yOAdlZWVjdns2rjda99/amffe3rX52Ml4VMZmD+EXouGeq6xsUXPQBve9ubXvfoqx+1fvLU8YMgrDLxsir6DtwT9QVnec7Mznufee/ZZRmrCBGU4vkO4VCoZxMHDyC2l1DzD6uqUHaQGL60q0NEhLquGyMw9yJowaNwABwIXgTCFJK4RMFQkII5b6pGGvNJyXtpjFnKvYQwKBbbF19L83rjhyNWphi0hUSwhl+SNCWCCSQAxIuvAdRQqpxzMxAmzDSq62rbObe5NDx86p3veMeJZz/nJ1+2vb3TGHrDDMw/CtJd85xzzsH/+NN3/vwll118eHPj1Hqed9fAukzAUJW6Dq7wIjln7JiZq6oKYZBzJN6TikdGREQMUYnnjUJIpCE3QpzCnfg97FBrqOowMdiF/Eq6izOHfIhCY/KX9xx0wGnI3YgjqMacCwREAgVDNeSUmKg5uAuhD3EwKqogUpACJOFnNuGam/9cZgZ88LqEAGJWxD4ggDQaPyU4Dc6WCgABtGbmSiEz52hKhF3vZUs8NtbWjpx83/ved+L7v/8ZL55OZ42XZvwDe+12Cf6hw6IMIh7nnnsUf/7ed/38gx90/yO7o53DRHyQM7cGYNl7HTBRL3NZB9ACRBkAp4ADEat45pBYIVElgVLKlGqIHYghpEAwP+TIixKYiYgpYyYKt35iIhIREhHKmUJVWYSgQkwx9UtKUI3OSsgbS/gqMTNp9KJC/scRMRMTEYsSqZKGtBCBQExMqkIkGjM6TA4U7IxofL3hp6hoeB4QqSop4t9jIX4jVRCH7FN0lpiZyTGxI6KMgIwJ4XNymWN2Ozub7qEPexjd74JzrnrXn7z7b0LomJwhwwzMN6nnQkTIMsab3vSG1z32W684sr21eTjPsoNgWiOiJWbuQ7VLQEGquaows2MvnkFEqhqOqmpz6JRAxAxHDHYuVnAklpoZAIOiR7DgqoqA4odjBqfQBJpaY1rJ2HD4giWh6CCFP2cuvW14HpKpNj0uwfMJ+ZtgERZdZqJQPhcALnPNc2g7UUwphxw8Jm0eGoyM4+ROIdgoNJ2KTATWGN2pwinA7JjH4x26/MorsLm5feXf//3HP5Aa8wwzMN+kBsbB+xqvfe0rX/PMZ/7rI6dPnzjcyYuDIrIG1SUAfedcF+JzUmQcOtOYwU1dWQFkMQyS2oNByLIMKuEQJ3eCY8OaxhxKOwcCIsALWBVMBMeh0U1bjkFTYUqGgDm6RqHMTRoeh2hIoCHrjKZXLiZtNWRXCATxHiqpUhTMlYcEaxF/JyJAiSAxM6McQqd5BQoLw0/N1+bxffDOFKHMhGB02DErKYuAVdUpQMyOppMJvus7/5nefPMtj7rhhhs+7Jyz2aZ/yDNgl+Afznvxvsazn/MfXvIfn/usg9s7Wwc73d4BIlph5qGq9ki1A/G5iHfMYEA4eirzO79qk9fIsqzJtzAASGyAg8IxI4u9J+GQtgjtJRAW1PDw5OHhm6Rs85qJQq6G54ffgUApv5O6V2LuIlhAasriXhWeQm+xhyIkcDg8XjS244S+F46GInkpGroEoSGZEpLKMU8iqhDV+FBaSBwmQxo6dJQQRiRYoU4VOUAdMPeIaImIVgE6oKgPvvktbzz4qEc9sqmiGebBfNPkzZlDh+5DH3oJ3vq7b/yXVTk+AmCdldeguqyqfS/SdS7LAHHsiKFKzjFUNHoh8/mjZGw4hQzxsGksCycbogQINPhAxHNvBASlUL1JYwOpPV9jJ29o0ON44qP3E/yDlD+OD6HG0ITPU/KWYrI4eCRIBoQAEgnNdKDmd+KWFwMAnjS+hvRaaCHMpCbkCqMPFF8gMYcqFsWvc8jvuBCHzfNSzMnJ0qquZGm45B/y4Euuuuaad/x1qp5ZPsY8mG8KA5Oc9+e/4CdftbK8tOq9X8mIllV1COIeiDvMLgPIEYhJ4nlJg4icDr2EXEbMcSRPpKmokEIhUFKUBFSqMezRZmBSW8ONDAYpw1EGCEGIocTwglgNCp273iskGhqlGEpR8CzUBWMl4kOVKnwVFMOv1KNLqk0GWpOHEueZEHqGg/FxIY/TGFABMopej0rIkUSjE6Of9BMAZvhovBBTwRQ9MRaQg6N4E81VtaOqPSIMM+dWtjY3Vh//+Metff9T/8XLQ49QZm9dMzDfDKERQaTGAx94Eb79SU9a3tneWckzt8TMA+dcl5kLIspcHOqhUJWBSCgTUwxvwtGlcKYw78Jt7tqiIDAUsWkNX2fyOX4k+QeQi98fjIcXATgOW4qfl64dg5ijEQgzS0gfMbAhBvZGFim0y8HIEDqAsxRiyXz2SEmhGcMzoVKBh6aSWQjJRENOSQSIFWilYMjCjJWAHe0pMy/+vqICiFJGTBkxsyIjQQFQn4gGzLxcVZOV5z7vJ1c6nQLe199QY8cwA7NvvJc0Qfytj7v6FUeOHFqSuh6SYqAiIecC5BQmCENyUrTxeoJ94Hl4AY2GRxc6ZFVDMldAADngjGa50M+Skqkhr+JiP0p4LGjevSuUciPBsBFzY9g0HdxoQMJBVGSOY7ZkMQFLi5PRsaUuDkyB4IjjLFTonUF6TGoRjnNLzATnggmF96HylTkwx8dhses4/d5eFvpwQglelCHqGMgJKAD0s4wH09nu0uWXP2L5MY999MvDNbLjYAZmn5Puqt/2pCcMoDJ0jvtE3APQEZFMVVxsGwllZ20bJmryCQqFF5lLTNE8fwEQ2GUxpxGPb6sCFPK/2jSyqQK1+Oa5G7MQDYqqogl2KHyvIgw0fj1vCNFDEPFNiTkd8vBcEp432ZpUMWpCteDVSO2hPmjU1BCU3kMdgzIXw6JkaLhp7gNi2IS5QWgqWFAQhVAvva5Y6ydHxI7YOXYFCB1R6Yv4QZbx8OlP/4Eh9niAhhmYfRkeqXqcd+45ePxjr+6PR5s9qPQcU8Gc5eyQqVQsviQiT4Q65hgIyoyaFMg4HNA9Q4llXaFSgXBoqROikKuoBeylCS8KduCY8K2Td+IYoT3PgyFQ8XG62AMQBH9KEVvb5qGMKmrvm6QtiMCcA1zAUwaPDG3pBlUfcjMtY6NhBHpeIRKB+hokHio1lMIQJSNquHgPgaJWhYCh5KBR3Y+VAQ0hoSjBq4+zlgJSD4gHxd+rlhB6xdCOlIm9qoOog1Iuig7B9Sej3cF3PuXJg/PPOzfOUlndwwzMfr2Y8XB+x3d8+yuOHDrUq6qy55g7IlqoiiMids6F/KUPYYumMnTsLyEEvRSV1FI/bz7z4ht5Baiiruvm57YPtMZkakopNDq2IoAIMg45FoYDlAGhkOpIIwetuzk7t/D8DIKv6yaZGmUW9oRIi9rAzNxUvNq6ve2EcHsam5qwKhjNDAxWan7v9P2OKDb0hd+Zo9F1YJCE75O290cgVXUEypi5YOZOVdW9c845u3/VVVe8KrxWex+bgdmvGZiYf7n88kd0makLpQ4x5USUMbMLhRZHzI4kxihZloUwxocDoj70uLAEg0A6bzpjdlF5jsDONdPRew80EYFV4VQA9SFBGqs8MX5aOMDBcXKhC7cV7sTSFpKOC8XHUjSQFJtWQj6FUyYJjYpLMppEMa/CMaRrSUhISubO60PiBRykrEBKIOVGyyZ1H5Io2AfDojI3roh5HU75mljJggSFGQKxqmYAclHtgNBhx93Lr7i8u/c6Gv//sdrcfYgXARNwwf3P61R11SGiQlVzInIi4gAi8UqqwWOoa4FzoUGu1hoaB/w4bQ6IszKVCMjFQcWmkKNBEU89vPdQCn9uOnK1NbUcP+cgDzVPy8piZ2ySW1ho3ReNFWFumuwYcaoaBInGK40SqEaPJPbFQGI5OsluUjQUqdkuGqE0hkAp/6QhZAttPamZLmjINN3L0Y4xx6Q3E3xqFGQOesS1tLRtKE2iM5icI84F2qnrsnvVlVf09kqXGubB7CPvJUgYHDiwigdceEGnqqoCzLkHslrViSp58cG4qMJxFsrMGhO5NO+gaZrngJhHCGVpKAUN3JgArr0PfSmOoezgQahqD5HYU9Ks+wj+itfwfAIJd/7Ylq/iAa3nnb0tA0MIJWMXvRiJeR1B6NyVqAMj4uPvEcrZGttWYgQWkshxXqql8T2/fkDwRJKHJBLHGwDUEnIzLBD1EKlDHqkJ50JHMTTp1Ci8D3ks5VTqj14OCTETM8EByBRclLOyuPiBF3bOPeesBa0cwwzMvjIwAHDhhRfi8JFDRVWVBYhyZTiFcuojS41jTUklrt1I5y3NxqgqyroCOGjehnxNMhUhGRpH/SCtzllyMfGavKA4gIhY1tboQajUwVAhNuth3hXcCHHP5xVCrkg9PELy1KvAI7Tz1943mjCiAk/heT0UEvKy8eegMabt/UYKbaYZ0cr1NKPimkSuoggWIQrcUWOrKOZp0uNC2KWoVZqO5ODBhNZBIMwoEVNWVVVx6NDB4qqrrnxFyhkZZmD2pYG5/PJHvKrT6eS+rjKCOlI4VrDUNbUb7JuwytcxPFhM1AJAnufhO1tCT4j7f+Y9MbowDKhRia6Gwsc8j8q8HyYdoPBcIUcTMhOuMSqLd/Dgikjs10mzUI1xiBUwuOBBNXNE0RNI+RHCYnVKJIQ3KRclsSTf/v3nejLB8FB8gOq82jW//nuW0qUytWA+KR6eP9gsVQbgVDVT1SzPO/n973//wvIwZmD2Jan/5clPeXKmkMxlnEE1gyizc1zkOXF85y4couRhEJr4Px0SF5OiXgR1qsI0AjA8DzJaZeTm4LODEIdcaww9EMOQZGQcxUQsM4RcmFNSNAp4wXZRdGg4CoDTgsRmEIhyIHJwLkeYgKCU4gklasyFsBoRCBfKzx6IhhCgr6N/lgwpRMEy3xCwV8c3eTIOQX6TNSWzw/N6lVDmD79bFDMmRnhIBqhj5uzM4M0wA7MPSG/2paWlzNc+8+IdgVglTEinlvy5gZG5g9C6Y0srD6Ix4SnNQWr6cEGxTNtEW7EEzS7sA6KWpkFIqHIcF0gehI+yl9Q09qWcSyoDq/dY7NSdG9MkMD73DHzI5UjoyUnhDjOfsfY1JXLbeyr35j6I2tcp/s4x/EnNiTpXiQmjAQhVJYjEzmE04WjY4NCsXCGRoK9DRCl8db1+3zUhonGfYFWk+zxUYueCS8DsouqcNFO9MXcQDmkoCs3Ft51zsdGsZfkzB/J1FMye97yQhuqQizWYkFcRkHNNwphBTZerRmmF0FyXVtG6kJBN3bGpRB4rRj5WbIQ0Zotorp/bDg1j+RhSx94WDpsDXEiwetVQeo7leIQBgKAV44LuTDJEydCI+mZsILpAIWOcxLGU4Engdd5fwxTK560xckgSE4/CXJRyXKJh8pocgTwDykvLS3bDNQOzP/MvqgrnGHmWMYE4LEML0gHxdDaLy9KqkCS63Q6z2Ll5oCAhActI4m2hgzeFOCICH0OnxutJB1JlLruQStapF0b3KMhFjV7GnhJ1qnKjNQ4QtwW0xLmDoUrau7GLWOM4AcX8CkfBuWbyKjXNxVJ8aPbdo8JHzdM2RqEtXp76jpowz/u58Wuug843KjQGjFuDDMGTAYgOHTpMbW/UsBBpX9HtdtHr9ZLrTSoa6zBK6YB67xfu1N77hXUfobyB+WFQRUbc9MYk45I6V6EKaTqB0UhhavRqwnwOgueiNQiSuufR3hsSKk0KX9cLmdNUitZWAjh5OE1SOQ1VgkJJmkP+ZW+4oarIXBbmGlXAcc8S7VWsW0h2pw5nahLhwfZqI3yl8c9NESx+XXRuVNXHrHK8NvOQramVUb/ft+yuGZj9S38wwHA4pNrX4a4YK6PzHIQs7qCOjXFn5HKStkpaaBa7ZlOi9BvdZduGK5yc1nCg+rj5Q8Lq1lZCNajGyRnP3Uxoi8R+nTOTq0mWLnknoqFJrik571HuTyVohyCcm1r620vhkmFazN2EsnQjcdma8E4/J02eN7058box5lsXNOWP0ihEWsOiHkVRwDwYC5H2Lb7ymJUzKIUelbBlsV0iJjBrWPcR1o4gytzG3Ej0KqIiXjJCZVkGiYNmHifINIgX+JioTWar9j4kdBsvKPTYaDRmTkNuJHS+1NGQuFjKRtNnks45QcAs0RNxzZZGiCKL0gmpmwUaDJXWCpdlYd5JW8lhjf0zArAGyQiVZLjmVa5mtKAV4iFKOET/BcQOORMk5lwolpGaHE4KHeEBMIKaaDJmczkKiZ2/qoIsMwfGPJh9SHpTn944jbvuvBN5kce7fqOzNM9NIIQPxC4O4s0rJs2RjndZ7z2qqgqeBLdCB4Sk6UKzWiPy5qIsgyLLGS7jEHPRXNYgGZEkxJ+8FWYXG/U4LkvjsPya5hKezByS0SIxYasQqeB9DUFaxsZNaTmFeY30JYeKT+UruNyhO+ii2+vMS9r0dbyxxlHSxjCrJnU8bQxp+3o45xqx8WR4mhI3ouXHYvWq6HTNgzEPZp8bG8zDj+TCt/tGhNKKVSBz0RC116yKzB8fH7uwJZHCXZs5W8iJpK4YZsby0jK81PjaHbejKiscPnIY/aIL+FCZ8XGWwCFrUiTUMjYhlEM0bh6UcRNOxPX2yLIMGTFAi010qRmwaUyJoR1JqHiBCFQ4FJ0Cx44dx9bWJoqig7OPnoPcOZTT6TzPIotzQUmgW+Mk+YIBaslbtA1NMnYLc1pJs5jCLJWIoKorLC8N0OkUmM3KM0NBwwzMfqDdLKYU3sx1HAWYN9cxvGgzrZe6b1u5VQCEPM8X8iFzT2MueUBR7BpRUGrQ6+Hmr9yMX//1N+D6666DiOB+F9wfP/SD/wZPfMJjIV6D0j8zmHLUdY1+f4D3/+X78d73/jkGgwF2dnZARDh+7Dge+5gr8Nzn/yTG48nc+CXvAASQgEiDjAQhSkCkFSctRTw/H+LMsg5+7+3vwNve9jaMxxMMh3089LKH4AUveD7OO+c8zCZTEPG8Tydekzp6bSkPk/Zfz/MymA9Sfp12/9QVHLzA1AwQPvd1hZXVFaysrOD48RP2RjYDs28tTEzQcuOJpLth2jYQdg4pvE/q+qGEKknaEgznQlgiMdTa24TmfQ12HNTeEKKgzGWYTqd43n96Aa697nM4fPgI8jzDJz51Lb5www1446//V1xx5RWYVbOw00hCDb0octx+++2499gJrB8EPvnJT6P2HtPxCJdd+iA4yuaDmAC08SSk2RLdJHt5Hsq0tV+gIT+0tLSEv//kp/Fzr3s9mB3yPMdkvIE//dP3YDAY4pWvfHmzdC15Ky5zEK8xqoll58w1qnvEoQrmRSE1GgFy7B05AEAatxBwEC9vRCIoJnzZ8jCWg9nPIVI0Cqn+OfdAwodzWfjI8vnMDBGYM3S7PTiXodsboOh0Qc5FI+Ka8nbadOgyBubtb2AwBr0ebvjc53HXXffgwIFDGAyW0OsPsbZ6EMePncQXv3Aj+r1h2lDW6Ld4X2EwHOLo0fNw9JzzwS6H90Cn28OgvxQFrELVh6EgjWLcrdlIJoeMs2ZWKnXqKkmz2lGgmMxm+NP/8acYDPtYXz+AAwfWsLq6huWVNXzggx/EF2/8Iopu0YSYPlaHQATHWfBYshzj8RQqoZ2wLD12dnYxmU7j3Nbi23qxkjcXBmsqZ9FAZlFcyzAPZv9a7JZGLbNrVqo2+ihp2re11oMdodfr49d+/Q345KeuxdlnnwUCsDvaxWg8xtOf9lR853c+BePxuMkrLJRwo3SByzKMRyOUkylc0cVkPG5EuPv9PgaDQbPnSERBHEq6zmWoqgqrq6tYXV1Bnuc4dfIUal+C8yxuMAj/c8xN2JMM6d78R6KtbeMyB40plTvuuAOz6QxFXmA0GiPPC1RlCef66HW7wdtz3JSWQ2k/mNHVtUN4y1vehD/643fhwIFDqKoaS0t93Hb71/DUp34ffvzHn4Pd7e34mucVrGZTpNBCL0zSQyZiZFk+D61sTZIZmH0TFbXWp+Z50VpEhnnC1oc7eept0XjHTM1jRbeLG798M/7qrz+AQwcPodvtYGt7E/fccxpPeOyjF5rs0PaMwhcBFZRViXPOOQedogC5LJRjZb5X6Jxzzw+HlzIwhVAhmb2qqiAiGI/H2NnZQV7kmO5MsDPajR5WkHtKiddkYNpJ7EZWc8/2xbnwN2NpeQmPfOQjcf3nvjgvJasizwscOXIE6+vrcflcKPQkHw0adiiRy/Glm7+KW2+/A1/96p2YTqcAKe666zge89ir4FwBL6HDOAZr82vWMipMDGn/mTOUZYWyLJuozrAQaf8kXqBYWzuAI0cOo6qq8B5thUpJbkElLYlPORA0+5273R5W19awfugwai84cOAQDhxcwnQ6m5dd47SPzss/Ud2EsLW1hUsvuQTPfe5zUZYzbJw+jePHjuHUyZN42EMfhiuvvALTybTZNJAOnfchVLjttltx++234/Dhw1hZWYFzDlVVoZYqTGFHISfdo9ubPBhmnkuA6lzrRmMiW1QwHo3xtKd9Pw4dWsftt9+OO++8EydOnMBwOMD3fe/3Yv3gOuoq/DxpavxzAwUARd4BkcPK6gqWlodYWVnB0aPrcI6hWodrzXu6giWU9ufaOzqf04qJ41OnNrCxsWVvZ/Ng9psHE97Iw6U+lodDSF1H6YPWfVzTHdSj9h4uKANAhJoVHbkLzXSVDzkFEKPT6aHX64UKiU8NdWFISNKgDhTiK4AYG5tb+I/P/Uk8+CEPwUc+8lGMRrt4yCWX4ilPflKo9ngfD6LCk0A1bG7c2NzAHXd8DZ1OD3Vd4ejRo5jNJphOxqj8DKF7x8XcRUsoCq4pBVNMmsIHfZkwnR0HlBFGAybjHZxz9hFcc83v4V1/8i6cOHUa5557Dr7jiY/HRRddhPHuLiAeqUmIUjKZCKWvAHiQA8pyik7vAHZ2a/QHS5ANQVmWjXiWj+MV6hm1TzNTFLYYaA2oW1D4ZmaMx+NGSN1K1GZg9qkng/kbVLGQM/G+blWX5nd4dhxnksLXppMJ8qJAURTY3qoxncyaDQRJvmCeYA3eh5cw56OqOHXyOK5+zJV43OMfg7qugxdSVSjLKhq+UJkJuYfgURVFgVOnTmMwGMb80RaIgLW1NWQuR1XPwspYnmvfhGoYGqPjojCURF1eanf5xmuSZRkmkxEOH1rD//nC54HAqMWjmkwxGo0ag81MQfYyzRXFLZSq87K0Sgh/er0eut0edndH8TGAI4q649rIfLX/jea6xfNRhBT+WQ+MGZh9SYrxm3Suc1CZDzM6l0G1Dl4HKbLMgVBAoSg6PXSKHibRuKysLDdducvLK8iKLjqdSSzZClyWoaorlL4OXgln6Ha6cfCQUZZTpHSC96HRzMW+mlCRQtzHLHCuQJ4XGI/HIHLgWPadzWYoy1mYHCK32FTXNPgFT0F83ay/BYIBYA3XABL+Lg13AorR7jZGu6PgqGhYMcvMyHJe8AxDSFQALqywJepAdZ4r6nQ66PX6KMsZzjvvPOTZEgZ930yWE4ed2HVZzTcjxJCybXAo5qQMMzD72H9J0pZYyE20k6Lhzuyxcfp01HfJ0el2sLWzjZMnT6LX62O4NES30wXHOaSbv3ILrr/2WszKKYgBXwuqqsYDLr4Ig+UleO+R5zluv+02lNNZnNvJkBfFfOthFJAiZqyvr6M/GMA3+SCHLMtRdAoQAbNZCVVgOh2jqis4zlFTBY5dwA6tjQFQwBF6/X4crgSqKuSc2Dl4FdSzKkyFF0X0FgjDpWWwy8Au9LNkxFDvsbm9iSz1vbBDnmc4duwYRpMx+ksD7PbG2NzcbOQuiiLslZ7NZtg4vYkv3Xg9jp84AWZGt9fF5tYGjp59FPe/4AL4slroXE4LIBebFw0zMPvVwKQBQ2ZwHG5MVRYfh/KKbhc33ngTnvWsH0eWddAfLKHT6WA6m2E8meKss45ARJC5DN57nHfOeXjv+96PP//L92N5eRkExWh3jHvuvQfv/IO346pHPxrdbhc//9pfwNve9nYM+n1UZQ3OMnCeNWp2ElvrFcB55xzBr/3XX8KRc4+inE1RywwExtrqAeR5jq2trfi9hF63H5rnJGjRJJW7sJCNUVYlVlbW8cUbb8Qf/dG7kBcdHDtxDFDF4SNH0OkUOP/oUTz5yd8RvBSXYVZWeNNbfxfHjh1H0emgyDtYXV7GxRddiMsvf0QsoYfGt/Fsiue98Kdw/PgJZLFCV1Y1jh49F/1eDyqC0e4Yl13yUPzZu9+Ld7/nvSjLGTqdLrrdLk6cOIbnP/8n8YLnvwC7ZdWUqNu662EC28NZycMMzL4MjeJtcWtrE6c3NrCyfDZq9c1EUpo9cpwhczm2d0bY3NoB0QQbW6PYyzFEnuWY1lOoVzhmTCZTlGUJgUen08HJU6fD7iW4uLc6Not5jw9+4K/xvOf9BL7vX3w/trc2UOQ5qjhjo7WH+BrdXh+b2zv4oR98Bm760k04ev65qOoS3leoqhoigrquUdfhc1+HVaqpozjuFmp+b68eg8EAX/vanfiZn3kdvnzzV7GxuYXB0hAqHrs7O3jiEx+Pf/tvno5Op4uyLDEcDvGFL92EV7zyNWB2GPSHKGclnCM8+clPxGMfcxXKsoKIh8sy7Ozu4vY77oB4IMt8a04pvL5Opwh5prKKa2AUed4J+aY4Jd7r9TAfkKImL6NNkhwhiW1OjBmY/WpgiAibW9u495578cCLzsd0Mo3t/nOhqFDByTAcLOHAgXVUlcdsVgJ51khmEghLy0vo9XrY2NjEZDLBcGmAqqpRlkE6s9vNMByGwTwAqMsKjgkPuPD+uP+F52G8swKpy1h5qeHLCpkDhssrOL25i06nA5dlTQLae1mQOHDOzQ2N940OTMpNqwJl6bE0XMLtt9+JF/zn/wsnTpzA6uoaDhxcx2Qyw/bWBr71MY/BT7/oRThy5HAz3yQiGA6Wcf8LLsL21nbYUMkZVpb7OP+885DlOaqqbvIl8yHQYFx2d3fQ6XQbBcEDBw7g9OnTuO2229Af9JDlDnUdrmWnU8Swby5WRZRkR1OohKYZMc9yMFPMF5k0rxmYfQgzh/xDHAYM+0opuuEC8YosyzEej7G1OcLy2jI6ed4kTfM8x2AwQFEUmE6ncM5hPJliNpsBCKtMJpMpqnIasj5E8CLY2tzFxulNlNMJXvXKV+Ldf/ZedAddeFGwMg6uLuMtb30Tsk4fjsOmgrmkATXP3el0MJmMMRgM4X2F3d3doLnSSux6L1gaLuFrX7sTP/iDP4Kv3Xk3Vg+sovQCAqPIMqytLeMXf/F1WD94AJubm82a26SNI+JRVjNoGbyRnV3BeDKZN/K1fl45m2F3d4r19XUURQdF0cHK8hKGgyGm0yl8NCjT6RTVqJpryohgNBqF+a5Wp3FcE7WwKsb7GmsH1rC0tIStrW1YK68ZmH1JWvkhKmGFB+YrWR3HhKZzOHjgIFaWVpF3uqjqCocOHcTx4yews72L4WAJuxunsb6+jvFkgrOPHkG324OIR57lyDLGZLyNIi/C4YpJ2pMnT6IuK3zv934vHvGIy1HWNUQVucsg1QwAw3tFUWSxIY2b1dNVNYOvPfJBjjwrkOUOTEAnJn6TYn+tHv3+AHVZ4adf9CLcc++9WDt4AJPJGN571HWNA2tLeMMbfgkHD6xie2cDznUapTkiwunTp7G1tYGiKObeCjscO3YC0+k07qGu4cWjKHKcd965GI+m6PR6yPPQcbu1tYOjR89BVZaYTKfI8gIHD65ieWW50dAZDge4+647MRwMYh9S2iPFoXEw5WPiiqg8y1EUub2JzcDs71rSXL82/jn2crBzGI1GuPDCC/DuP/uTmE/IUfkKhw6v4z8973l4+++/E7X3yPMMRA73HrsXz3zmv8aLXvRibO9sgkDIXBC4rqoKs/EUS8PlEPY4QqeT47GP/VZQXgAQVOMxmB1cpphOpjhxahd53mmSm6oEqT26nQKz2RSnT3mUsymAHFnm0Ov3gUYy0yHnAt2ij//y0v+CG794I9bXD2JS1cjYYTaZgUjxwhc+H4++6kqcPH4sluYFqgRfh16f7e1tTKclhsMuVGtkeYHZrMLd99yL2ntkHE78rJxg0O/j93/vrSg6PZRlibW1I3jlq16C33zjW5BnOba3t5FlGY4dP47v/b7vxi/+wq9gd3QaTIwscyinE2SZw3i0HawIYngUw6YQHQVpCV/V8LXtpjYDs68TMoBzi+387BxUBL6u4bXGrKxAcMizDMI1WBVVNcHW5hZms2nsPykhqijLEqdOHsNodwOT0QhZ5jCV+VJ4albQhmTmDV+4AR/8wEfQ7zgMlwa4+tFXYzqb4sYv3IDaMx502eUAFajFNcvdXBamlMejcejK1SCHUNeKuqrha4WvBHnHod/p4+df93P4o3e9C4PlZdTRQyoGDqPRDl7zM6/C05/xdJw4caIJi1KOKnUQd+NAY5r7CTmfCpPJGNtbWzh06CDqOujKlLMSnViKzjJGkROm0xk6RYHxeITd3V10u124LPTbEJWQago4h0kZ5EO9DyGQc1mU2JwPpBJT/DvXaPka92HKwC7BfW9hvJeFJfZoLU7LmIPoNUdpTF/BSwlBHSo+ShgOh8iyDMtLS/MEpcy3ARA05na0VR0JE8g3f/lmfOlLN+GW227Dp6+9DuPZDC4vkPUGuO3u4xiXdbNJEQjduKE0vQmFx3Bp0Ew57+zsBu3bIofLcqyuruLnfvEX8cbfeTO6vSF2didwWejjOXnqBF74n1+A5zzn2Th16gSYKWx6pGxB/CkZmnk+RlHXVRSOirNMIBQuR8ZBJ6euSkhdQn0JL1PMJlMwMVZX17C2thYTwoTxaATVMsppKpgUIjW8rwGE/XdJ70WgzUxWkgtVVdS+trewGZj9WEmaHyDv6ziGFKtHKURih9DlSoDGfULIAM2QuwKDQR95zsizee6m3+uhKitknIPh4sI1NEalvY+5rmqsr6/j7LPORqc3xGUPfySOnnc/TCuPr951DDRYQXdpBZQBeeEWKjWDwRBLS8PWziNAvCDPcogQDp91FL/z5rfit9/6uyj6A5SVh/rg4dx19914xjOegRe96MU4dfp4Uz2LFiyKmmucyuaFrt5UGq+qCsvLyxgMB/DiQxk+fl8Q8Aq/syOHbreDugwJ6LRjqigKDAYDkIYFc8GMh47pJpGbFPnS+l2gNezIGI1GGI+njddlmIHZH1mX0CqLwaCPAwfXwp6iuObVtZaUpQOVVrcqPHxVwYHhlNDNuyiKDmblDN7XKKsSk+kEvV5vLo8gGheMxdxO3NSYMaGTF+h1u1heHuDg6gr8dISdU8dAWuLI+jrU19gZ7UCJMZ2VIHaofYXZbIrJZIbprMJoPMGsnMHlDtNZSPwOl87GG9/423jtz/0Szjp6LvrDJWTdAsOVZRw/fhyPesTD8Auvfx12tk+HjQLIoQBqFVRah82QjGA4VCDwWFtbjr+XIMuCIRj2e8GzU6AkRe3QGCXHWRSYUhQug8vnpfTh0hBlOQ09QZTBqwZ1OxBAWdjRHccDVEPXcKYIq25bxmQyHluIZAZm/zIcDrG0tITaeyTt66qq4ONBSG9k730oWTeeTVJUC/NFp06dwmQyRlWWqMoZHM9zGaAQ1qT8Syh9B4PW6XQwHo2xcfo07rjjLqwsLaHTKbCzvY17770H1WyGXi9MS4uvm74yHw/aaHfUqOylIcxpOcM7/+CteO1rfw7dXg/swnBhv9/H7mgX/+y7vwu/9VtvwM7uJmazcVzDonGdkywsUQvDj4rBYBA2C1QVVEMzYFEU2NreQlmWcesBzVekNOlzAORQFB04x6iqElVVhnyVpNyORxjF9iGUbImmJ+PeBKw0v0Gkcj+AM3ZVGZbk3R9hkoRSbOgVmd8Zk0YKM6Ou6/nCtbRwTIJ3MpvNIF7C6MB0Gh+bo2pyFGF5O7WWLydxJhflHo8cOYIHP/hB2N7ZiSXbEv1+Hxdf9ACUkiFzBF9V6BRF02tS5KEZLS9yOBd0cuu6xuraCv7u7z+OP/7j/wEFY1bOMJlMwI5RzcLB/u5/9p04ctZhbGwcR7dTABJ3T0fpTNB8NktkLtQdQqMKnU4HeZHBZRn6vf4ZWxzTFgXv63DN4k5vqX2zxM45hyLOXUGDcFYyI8mozEM2ala/aLs3ptnoYJiB2ad48bEpTRsJgEZaoL2XJ76ZsyyDi4cABKysruDAgQPo9/tYWlpCnucYxSrJ/JBoI1nZHtQjAOPxGPceO4Z77rkLt9zyVdz+1ZvxgAdcgK2tLXz6U5/Gqa0RzrvgQmQZNzIPIAI7RqdTgNlFbyCMBXQ6HRw/cQIuy9F1GWazMeq6Qk4F2Dl0Ox382q+/AZde+mDc737nQH3deB3NNoHoJmeOQ25KNfS6EMXqkAczodftYTgcxqqOnzfChSX1cOqaVbKdooul4RIOHTqE48ePwzmH4XAIhYdCQKzNPmtqOemqIWwitAWz5gvezMCYgdnf8WbadChhy5q2FNUW9kq3cjKIYY5SMFCqwIEDBzCblciyDOwIWVx05mOjHTuXcpWxWc5hVgmmZYnzLzgf2zvbuPhbHoyDB1dw6KyzMSkFT3jc4zGeTrHc78AhQ13VIPFx73Uo0TpmFEUH0+kkejIZup0O6iqEMZ1OLzThuRyTaoJOt4uvfOUWvPnNb8HrX/9zGI92Q1KVoxB5EgZP0jiEpoIE5TD82cnBjjCbznDq9GnMZhUGgwIcDXUTHjFQT0uoF/SHPUymu+j1erjf/c7H6dOnIVpjNqsAzWICPWtJZGK+zUFk3qfUXERYaGQG5pshRsLcK+AQzoivmzxAMjRJNS2sSA3ufy01ynKGzc1NDIdDjHbHuOD+54cej9hPkgSw0905hUlEjNoHQaYvf/lL+Iu/eD+897j6MVfggvtfgFtuuRV//p73YWPrNH7sOT+J2XQWRbU9SIG6CsOCRaeDPC9aoUcWOlxzB6hgMp1iOp0izz2mkwnqusb6wYN4xzv/EFdffTWe9rSn4tSpk6HqQ8FLSt4BRMEAXFilhLW1A8EgxE2Tvq6wvbODsqyxNGSwzmegFCGtouGbIQCy3CHPGSdOnGwsWJEX4KwIa3Vlnnxv8ixAS1mQ5jKmOu8rMszA7FvGk3GYfaE1VBIOF8d8S2pfT6Q8DMXeDBFBVXkUeY5erwsV4NSp0xiNxuj2ugs7fkK/TAixktdDRNjY2MDT/80P4Nue+O1gl2M02sJkMsLVV1+NJ33bd2BaTrC1G5r4mDgc1rj3udfvodvpIMuLpi9FxCPPuyACjh8/hiuvugJ51sEnPvEJ5HkBFUVV1hj0B/i1X/t1POQhD8JFF16I6e4IzsWNCUrNBsq4VhLlbIa6DjmVWTlDVVeACJaXenFPdGuxffIsnAOIQVmGja0t5EUXo9EEp09vYDAYQhVBcD06JGk4UpkWNHk4rtdt1vjGMY75azTuU6/eLsF94LhEz2Q0GuPkyZPIi6IZrmv/fRosbJK8mC8Y63Q66HY7mE5n2N3dxXg8Rp5nyLLQYs8xTApDlCGhnGQjiYJAdrfTwZ133YkPfOCD+PCHPoRj994LEY+dnR185tOfxic/+SlUVUisZlnWat6JIm+t15VlGfK8wO7uLo4fP4aHPfxSvO13fxcveP5z4X2JqizR7/aQ5zmGS8u4/bbb8apXvhrT6RTdbrepyIQRg9Z+NibkRYEjhw8jy7JGcHsymUQZT1q4XmFPd5QTJQbAGAyXMCtL7OzsBqNcFOh0ugsbD5Ln025n0bQgHNrs226TZzaHZAZm3zNvQ08L2VPIkRK9abF9szco3k47RQEvgslkCufC1HKed1AU8c4cpPLDMrbcAa19i6qCbreHr33tDvzOW34Xv//f3o6//buPw7kCpzc28Ad/+If4/be/HceO3Yssc8jy0KvivaCuPba2tqKkAqPb7cbJ7gKnT29gdXUFv/Vbb0Snm+HKqy7HS1/y0yjLabM3mxRYWT2Aj3zkY/jZ176u6Tlhl4GzDEKAp7CsVYngo9ZL8uwk6hFPJ9NGmEvj9zI7ELtmt1IyBJnLsLm5Fapdq6thMZtbNBBhR5U01zlzbq42CI0Sn9ro6rg8Mz1eC5H2ucUmigr2aBKIWezMbfeEuOiRhDKsoi5rMBiOGNvb21hbW0O/H7RmH/KQS+BVwJkDHMNrWn8Su4OJwY5QliWe8p3fhasf81gsr65BygqshEPrZ+EXf+kSlH6Kje0xRpMJZmUJuCBKJTHEms1mMcEbjNvJkydRFBle/wuvw1lHDmJrexOj0QjPedaP4uYvfRlv/+9/gPX1dYgP/X7LS2u45po/xMUPvBjPftaPYXdnp1GLQ9QKFgFWDxzA9vYWptMpirxAVVUoih58FbRziV1Yq0sMuHgZVaF1BWiNjAnj3TG6/UGzHoWIcOjQ4RguctMzFPSCPVzaDcOIe6mzuE8qhFNe6tYNwvRgzMDs2zzvXPhbW528ABa0V9oL2lOvxsrKCg4cWEXR7WJnexvHjx/HaHcX13/+enzHk78dZV2BnUOOHEx5o0Kn4gENLfcEwvb2Nv78Pe/FtzzgYmTMqEVw8PA6VtfXmtKsj93ALoYhg8GgSUAT5cjzHEtLQzzhiY/B45/wGGxsngIhzC3t7OzgJS95CT5/wxdw4003o9ftAQC63S7yPMMv/OIv4+EPfzguf9SjsLO9GRLKCEYoyzJsbmxiNiuxurqKr371q3DOYWt7ByvDTsqRI8tc3EA5H04kJqjUcFmGCy64AJzluPPOO3Hrrbdid3eE666/Djvbm+j2u/A+XJs49RT6k2i+mypJmQKAV23tUEqhnb2XLUTajwYmNpM5x0ELt9XNmuZmklEJgk9zcapLL70Uh9YP4fz7nY/llRWMx2Osrq3iTW96C37pV/4rdkdTjEZjjEZj3HLLraiqCs6FO7TWHt2iA/GCtZVVdDodvOMd/x2f/syn8afv+hN84uOfQL/fD02AtV8on3c6HcxmsybvMo4t82VVYmlpCCAsO8uyDrpFB+V0itXVJbz2ta+B9xW2t3caAzoYDFFVHi9/xatxeuM0siIP3ktKtsbVJbu7u7jlllugIsizDJ2iQCdWzCQuXUszSymX4ziMBzzwgQ9Er9+HiDTh49LSEt7//v+JV7zy1bjrrntw4uTpIA2xtY1Tp04hz7K4si6uW0mhUMvQO+earmlL+JoHs299GABhuVojaDQvh7bL1araeCGT6RSPe8ITcMUVV+DDH/to4+1MJlPMpmP80i//Gj7woY9hZ3cHRw4fxFlHDuHHnvWjuOD8c+GlAhQY9PthH5AIrrjqCnzuc5/Ft1x6CWqpcdHFF8H7Gt1uF91ub+EAMTNWV1cxHC6h1+tiNApDhHVVYzqdIXMdMFeAMiovyJixcfIkrrzycrz2tT+Ln37xy9Hr9cEEDIYDTKtVfP6GG/DLv/KrePGLfip4dTL3CpIMBcelar1+HxJr0cmzc6RN5+98r3do0rv88kfhQQ96ED78kY+i0+2gKquQJHYF3vve9+PGG2/GdDrF4cMHccF5Z+HpT386Ouefj0or1Bo3O7SNSJzr6HQ6KKKin2EezP4yK9FoFHkBUgUzQBkDmYvNcHpG23owOPMJ4+Ggj+c//7lYXhqgnM3CwrPSIys6UGJ8+CMfxXXXfQ5/+3efRF0rlpeXgwpd0YE4Rt7rAY5ReY9ht4fbv/pVvPPtb8OHPvBXuOD8o5DKw09rqJ9i9cAKKqkh5FHLDF5qZI6xubERwq24q3o2m6GqJ2GfE8JuRyWBy3OcOnES//7fPRP/8l99D7Z3N9Hp93H69Aak8iAB/vCdf4iPf/yTGHT6QCVgFZCEpLZoheXlQZxi3kGRO/T7XbDjsAO7qgBfg1SQIZSXiRSz6QSDXhf/7oefidWVFYj38L4CkSLLw6qW667/HG74whfw+RtuwHWfvwHj8RicF/AUFAXTjBQQJsbhQ67GVxWqqrQ3sxmYfVY3igZjdXUFhw8fDitMVVF7nxr7m6Ve7Xb01AuSZRnEe2xunsKlD70E3/M93x3yJOJjZzBQlhWWhsvodftYGi7hYx/7GD73uc+hP1jG3Xffi53dMS655CFh/YZT5J0MP/ETP47nPu8/4V/9H/8Ks9kYBMUdX7sDTIyLLnpgmJp2YWgyNN85dHo9UNSwDetTUou/NNPhTe7Ce2xunMarX/MaPOyhl2Jz8zRcFnR+l5dW0esN8Zu/8du4++57kOc5xHswEeqyhghQFB1kWQ4CR0PhY1/PvP+FW8Y49Lpk2NraxBVXXYkf/pEfjuLeXfT7AzBlmE0r9Hp9LC0to99fwokTG7j22utAjoKn12qw40bqIlTTZuXMVseagdm/hBWm3aYUnTpEk65JqialtSBpjSwRgVih4nHi+D144QtfgDe+8TfwwAc+AP1BLwwGlhXKskQ5K3H61CkcOHAAN954E7q9g/hvb38HLrjgAjzi8sfiPe95L+64807MSo+it4SLLv4WPOTSh+LW2+5Av9/Hb/zGb+Kff++/wHnnnh8qNvF/5WyG48eOwTnGzu4OyqrEeDxGt9dDxi4MF1Z1a+F9yCHNpjMcXj+El/z0i7C1dRL33nMXRuNRCPsmU/zd330CP/LD/wG33nprvEqCoshx8UUXY2V5GVVZYWtrC3fdfRe2trajaDo3WjXNUCio2eed5xl2tzfw/d//VPzmb/4m1g+uI3c5dnd3sbW9jdFohNlshu3tHRRFF8eOHYMvZ1ANU+7idcGIeJlX9Yz7FmeX4L7zYPr9Pv79j/zb7xr0ixWQLrPLBs65DgG5ijgiIo4rBJtcQyMrKU2plBzj0ssuweWXX4G7774HBEWnU2DQ6+LQ+kEcPnwIr3jFy/C0pz0NX77xC/ipn3oRjh8/jtOnTuGlL3kVbr3la/jz9/0Vfv71v4J+fwnPe/5P4SMf+hiuu/4L+NjHPo43v/W3Ucs0tvErukUHd995L2784hdw//ufhyPrB3Hh/c/H0bPOxiMe8QhcdeXDw+yScnP3J4QcUeYyjMc7uOjii3G/88/FTV++CWeffRhnHz2Co0eP4n73Ox+3fvVOMCu+7YmPh4piZ2cbn/zUJ1BVJdZWV/CQSx6M1dUD+NZvvRr//Lu/K/TGRAPcJKNBYMqg5GPCXOCc4IEP/BY87GGX4cSJE5hMJ5hMRlhZWcL6oQM4dHgdz372j+JH/8OPoCwrMOdpy6WCnSi0UsWMgFGnV+zcftudW2972zV/aQne+/Bs2CW4bwyMquLwoUP40Aff96uHjyyd72t/joIPw/EyifYJyF10WZJ3k2VZGIwERbGkeGclRl15DJeWQwl3M+ikaJz87XQ7ACsOrq3jN97wRuzsjNDtdvDG33ozfue3fxvv+pN34Su33IznPOdZeOlLX4Yff/azcM89d+P33v5OvP3334pHX305tnc3wZTBRQHxouiiroN2TafohCFMhM5b8WUo7UqcTSaANCSwERXhqrrG0vIQVR33XjcSlB4qgqoqkecuaAC7HOPJJHglWYal2Oo/m01QVyWUtCVjKbEK5UBgOI4Newi7ksR7DIbL6BY9nDh5AidOHMfy8jJcFuQ3+91e0wtD7OClVhBEwRWIxiq6Ld4fX1lbuetjH/3k1574xO98vjXbmYHZpwbmMD74off96pGzVs73ZXWOEh8GYTkj7jNzrqpMquTj3ZmZIV6hAghkvh7EcRAJj6FWN+8iz7IQOgAYz0ao1YORI3M51lbXMB6PMZlMsLq2hvFohG4R7tZbW9tYXl6CCGE8GiPvOEwnYxRF3hoIxNzgRR0Xih23EkcbUv8MnfGWkSh6FcKLLMvhXD5/Du+jdjBachUcjEfatCg+lDPj7mtpXdc0LqAIA5QZhSnsSubT1lJ7qHh08rzpQhYRlLMSdT3f/xSMtyixk1q0ItCYmLbrqj6+vLJy18c+8omvfduTzMDcl1iZ+j4kSVoyM4Qp9F2kZCLmkgHJ9ffeQyV04wbJWYEQmqpTmtVRFUxnYdGaiEA5rKFlDitMtrc3AamRO8L2xgk4l2F3NwhWdbsdjMdjOHbo9UO/y7yhzjUl9CzLGtW9uUGJjXjex9cMwHFzW5I00CkAOVoQ8Q45mix2K+vChst21a0Zo0gaxvG6pdCoMeBRF4YAiCK8LvVBgIoAijmUtGgtae2mrt7UNd2EeKTNAGbYqAnYojVL8u5rtre3cXrjdLMCNg0mhu0BQRohJXab3A0pRMMu5iQgpdCgH0tB/T4o9DOYFXkWNGdSaCJaA/AxL6KNFxQU+l3T9AdSlOUMzMnLyJop7HbCMw1ipvyQA4V+Hi/hZIuESE40fK01MInmkAajksrH6XdtPlJHs0bjGjdNajKuccQq9ckkuc15NSko1jEEhLhBgLEgwBWqXa7xFNtjGk3yfUEILMheGGZg9h3pblxWJTY3N4PnsfeGKO0wYX5Hn2uQaAwZtAmF2o156RSnryXjBYShyrC7PSrpK6JqWzjszfdAgBi6BAOIhWXy7Q2OGmUc0uSxS+r+AFgVToE8rmBJdiWVkqN4bnidrbms5jmT99YYxJDrSdsf09Rz8OTCwee0HC16iem52mtQooBMHF6cb11YCLe8NIvw0mtKE9vzLTPmyViItF8tdiyrJtHsNOsjaYeRr+Yi062dz0ShH8WLgkVDmJD6QDSGKHHFaToYQXoTsYwbV3JA52MISfoAaXl8MGPMYXo4DD0vHkQRH40URRkIP1fqi6XjZlNl9EIozvo0/ovEfhmE1y8a+3CjBycIIZWoNOtkEcMgVgKYIcxNxieL6tyiCh9+cGhmjCFj8PIYymgErnyU/cyYFpobXZThZMfQoNwFFw26CU6Zgdn3+KivK96Dsrzp5Qh5DQHRXKO3PTYQDA2QRfkDEQXtuZNSbBKraw9y3BywttfThF5oiSkBC/uO2iHLmZ5Y9LI0dM6y48VcSPIwKBzytnB2Ig8WrPF4YuzS8g40elvh94SjEIolr0IUmoxbs4OX4g7pGKpRzNcwB28oXtv2SEby1Np56WDow01g/j8sKA0aFiLtXwOTyrSpv2Uh/7BnfUZLCDzlAZxzraVg7bxD2osksUyM5u7LtDixvdfNb48ptA1PE2rFQxm+B62dzYs/f+HzuMhMU34J0UURgWttBah1Xg2bvy6Ceg/1YdqZoseWficiAquC43WQtjYvzaUwU6jUbGiMBit9LRmXBV1kokavJlbFVERUVdX70IFnfTDmwexbal9riCLCmxatu3tauNZ+EwdDtJiAlHiSmi5WXdyEmOf53EuJfSK6Jx/U/ny+gYAXulWToWkqWrGCFKo2jXk8o/qTXkP7z22PqFYBOwcf15aglqT93YRv5By0DnrFyhQWsjX5oRDqNDuWYoZKou5wMKIKSN3yrhCT1ojhJsXQUBavPyeBruC8MJMShQ8vYskXMzD7m1lZKsOpc04JSHdFbR/SdBhDt6qLsgSAagh/OJaJ02ETXazE7DUGTUUJ2pw0Ik0ORawBc5TGjIdTuZnBISYoMbyGpR7Ope+d66PMDVaS6KzPCPGQ8rtRx0VjJQxN9y81eaGU2PUi0dMIryz9vmEXXfidYuszhCQaBx+Mpc71dSQkpsJvF5I9LS8sVOa8CsjHBXDqIRoMi6rGvfdqswJmYPZ7DkY9QOLYCRGpxMRHuEvOPYf2vqRwSHjBiOxdBNb+vL0hstk4gCCcxEwh/8GhXAsw6uRBtBa9ExEEmoo6oCyDS8+bDmpIiMQNCTgjBGt/zL8ej3PsUAYF++ZTVMI0rzxF9T+NNq+xU6ph3WwS5laAxMfXE0MshPUjTc8OEVh8rJ7Nk8qIZf9m95GvQbFQJipKRLG8Bj8rK2/vYDMw+xpSeFX1dV17ZvYAhJl1r2FZzElgQTNGROaSm8DX3TqYcidN8pZCWBFkaKnpt6kq33TfLqxhTTEFx2RpquRoOH1E3HTnLiaPm7Vl8H5R6+aM509DhNzysBhNH00jKYx5CVu0VaZPz5PyKEkbJnlBHLwuIFS0iDm6bPPnrJKnla5b6qgjCIFEVT2gNTP7T33qU3W6tqkB0DADs6+YzqaVqlZZltWq6olIiEhEVAFSVU0ef/QMuAmRmjd2c9DmydK2YWn/uUkSIwxJanQF2mLjaUdTk2CNRszHXYgu3ffbiYyWQVnI56RAiJJ2LTX5j7Ynkw49x9UlCkItPshnNk2Bi4avnRDXWAJPgl1hGVQyPKFPhjWEU8FbCc131M63NHnnVjUNUFVVIhIXbgC1qtZVXVWfufYzJgZzH2NVpPvKc4lv4I98+KPVeDwpRXxQqAa8qgqFRhUNxoTBnCGVXlOSNz1PCGEY6mPfyzf4WU0CNwlaeQ9IFLqW1uqPOEjJTDE3I1BI0/HarPhAbDiDInShaDBOsbVWfBAIT1NAEjOlrf1mrXxMCK9UBVp7sCoyYpBXICrVpe5gDqa36Qrm2OEMahaexJ3UQfQythOCJDT8ZSC4WNqvJayH9aIxexPyPLGBT2tRFVUVFRER78XXRZGXJ06cKK/77HWv2uvpGWZg9gXJO/jIRz726ttuvX3mMjdT1RJA5ZzzzCxEYRWZSKrOhDAm3fXLMk4ta0jGarxD710/m4b3FjwGUVAtIC+xxM1NrgUpWRsPrUIg6kGqcHE+BypQqUHwoTrjK5AKRBC2RmpomIvyWai1hoePXbAKUWnNWIXRh/iToBz7g5LGS0pgqzblaN6zv0hFGkPH4kOPjITXmxr4kMrb0egQM9Q5KIUmOgIhJw69RdFtVCJVJgGRB6FW9WWWu/Luu+6dnTx5er6RwDADs98MjHOMu+66F1/60s3TXrc/FfEzEa1EpA5eDCkRNO1FSmFMu5QaFN1S8OIhUi8ePNWF8vP8MAJ7S+J7X9+CZKdSzHR6aF3HzQSKLHNwjpslaYpYdYlRCiF4IA4MhxDuSFMmj+r9LdW7qOhwxvBi8z17GvWSWJcTBUeDCR9noOjMcLEdMqYeGInzS+E6101/zdwdCkldIlQAZkXemX32s5+b1pUPv7sZGDMw+zNMCgfks5/9/BjApK6rKaCl974KycQoscKsexOj8xmj2FoWv51ai9nToanrupl8nhs3F0MInLFzY2/XblhixuH503lTAanCp1UoCIvPwLTweVp1QgBcSvpGj6HWMOqw0NSnEiUb+Ix+mvYiur2vk4lj2IQmyZs8IIkaM22D1DQvJiOarkNMKFPctBZlbjyACkCpKjNRnfztxz4+sfDIDMy+JvVpffCDH3nZ9s7uOMuzMRFP452yliCRr3sV/dMowd5StMZO3XTwnHMLZel2krf9PW2PBXu8h8bINHd1TYWk1tL6EJrNDQ0arRZN+4XanlEcVWDHzQ6kdODn0+N6RhPggmVOn0avRqIujFJo3BPg6zb8ta9ZOze193MiggMpiESDgnmlqtMsc5ON0xuTT3/62leYgTEDs88NjIAow/Wf/zze/9cfHg2XV8deywmxnwJ1RUQ1iMWLqiipaBpOrFHXJQBB7Wt4MEQJDg4cpSnTQXLOIcsyZHH1ajpEyaORPaHE/MAo5k5UyMFwNDSOg/fjhSBwIC6gcCEDohIHJWOORQARAuDCXFUaOGyPGpCDczmYMxC5hYa8BW8jel4hvgoVNShBNSav07Q0u7AtU1IJPXhVXmsIfPNfUg8SD4gHQcAZo1JBraJxEEHI+5rUV6o6AzDtD5bGn/7MdaObv3ILiEyX1wzMfr+gcXr3mmveuavqdh1nIyKeqOqMCLWqeCIIEdQ51pSrSHMy5ByQBcGqmgChefm2fXedl6B53tG7YOhoz3qUICHZbJdsWvCBqqpDwtk5KHMQvcozgF0oDSvD16H7F5mDJ4UnQB2DslCZCt37EpKyrZ/tvW9yJdzyxhbzNBq0cuI8UiqbV+KbniCO4Vn79xIChMN/K/XNqIFLfS8EEFMISZmEiL1zrmbiGREmIjJiznavueYPdr2vbZraDMy+z8I0+YYPf/hvX/n5z9240+32d8uyHqvqRERm7KhiZh861L2mPcjSujsjquKBw2AeR8W59o7r5M20vZa9oULq9M3zvHls4w1RyJ1QLInXtcCLh1eP0CETK03RGDTVqJiLgSN4KLK4nbJRlqPFZPPXM3xt76qu69Dvw6nsHf5bEwFZDrCDSJiNUp17SiGcCiXoJmsbl9w3yn9eEfNdClXPRBUxzUCYABh1Op3dL37xpp2/+PP3vypcFw9TkTUDs68NDBAU5KaTGd7y5rdt9bqDLVXdVtWRqkxVfanwtcD7Wiqt61rTfBATgUVDBUVCu777BtPRZ8ow6BlTwCmvs3eaOrzSUBaqvQKcAc4FD0IEUtWhdyUma4hDBanpv09lZdGYcK2hUsP7upmGxjc4qu3kdnvKXJihGQfvzVGQ5nQMzrKQ5E1em0ozH0Ve4QQgL+hwBscuzm1JCCGZ1DmnzOxFtY5tA1OARnVd7wwG/a3feuNvb29sbDZyGmZg7ltsbck/CKH0ceOXbvrQk5/8pCecd97RYjKd5s5lGQFOVTktKxQVYmZiZkqTw0mRP1Rs3EIytx1StT/2lq+TJu1cTCrux1aJ8gcERxngGD4sbIZrJBIUjmKVSBWkwTOgOIQoUgfDAzS7hlLbf1KhQytU0RQGLXQIx5oxhw5EMJremSQGHpW1mkZCiMILkPQxPRQuC+Lh2jTixSkEJVUK/S4E1ABmpDRWYEdUNoaD4anPXf+FEy94wYtfXFV+YajTMAOzv81LVG6rqgpf+cotV/zADzw1B0numDIOfftOvWdVkGNHkdSaT0mU6utWXBZ+jsaQjFoK/imkkQUhq/RJ6OoNoZEiHVZAawFF74CZGrFu6FxXOCygpzDpLFEX13FTKWIOa3LTmFHbu8LX+R0UIY+Tem1izqSRi1jIIcUKV5iijh3GPBfHQvT2mEnDcloXBqgZFYFKUpoQYadWv8WOTqnyiR9+5rOO3/yVWz+a8maGGZhvIiOjyLIcX731to8WRXHV93z3U7Kt7Q1Hyk5EGETMzEREVNc1xR4YSp29FHQEFpK6tKcpbe/ne6s1bVX9pMqfRguYGeriYVUF+6i6ovN1IKnbOA0fcur6TYpwLcGrpks3SVLG72+MSxpYanlfoQQ+z6k0RiROQQdDI0GQyrmwLyl5M1E6AnGigACNTXJxDEkFhIoUMyaagLADwlZZT0+tHVg/8apX/dyxa675o1dnWW6DjWZgvnkjJXYOH//4Jz/40Idd9uhLLn2IG492iZlZVTmGOxSTsRQ9mFg0agSTFjZBMoXtiu2QqS0Tmb5W11XcO90SpkIcHkwduBIDkqZyE4xQGEpO4ZVrvB/nHLiVVA7VK0ZqlmmmrZu1uGFeCISFZHHbwCS1uvb3syI+b/jcUQy1OA6GtjJeIcoiBHvsBVAhIq+QkohmTDwm5l12brNWf+rQ+tknr7nmD4/95xe+5KVz42LeixmYb0r7EnIhVVXjf77/r//miiuuuPpbvuUiGu3uNnfnoNy2Z24oyAk0K0w0xTmEJreyJ6lLuifHEdaDuLlhSbotjRj4PMfvvW/Cp0YrOCWCo0elaZaoJYLF8cA38U58nTR/UcnZWXgNKdckmBufZFDilpMgw6DQ9LO991CKYlNorkNM45A457yI9wDVzK5UxRTAiEA7orpZVuWp1QMHTn7845859swf+tEXT6ez+Jos92IG5ps8VGJmjCdTvPvP/uKvL3nwgx992WWX6HQ2UgZUiZXZqYgoEQeBqpDuVS+1EhPiHmUNiVWJnfusLXFrTT9rHkY1cwmhOa72oVdFEP8bNgs1IlhAVNvPYlhF8b/BCGrch+TVNytB5hHc4mqQJpGb5B1aUhRpO0LdSkgjdRU3WsSMWrw2q2kJCiZlhrKGvDAhzXaRV6hn4lpUS1GdsXMTVT+C6jaAzdrPTq2vHz7xiY9fe/ypT33Gi0+ePNVsfzTMwPyjMDLOOUynU7znve/7m7W1tcuf8PjHiUB8WVaeXeah8FG10WuQEhBtlhmRhOyCeAIJkxNiVp0nTFIrSJKADLmI4AkpEytUNMuy9DdKBAW5ZqbRsVNypGBWAZQzpwJVr16VSJVI0YwlBUlQEVUijj9//nl8DRoNn2qIB5s/J0PKzCoiysyqaZ1RmFhMy6OEiHz8uifQfEhLtSaiGohJXKKpwk9AMiLCNiBbXurTRZGfXDuwfuKP/vjPjv3QD/3oS0+cOHnGWIZhBuYfjSdTVRX+8v1/88Hbbr/zEY985KPqs84+ux5PJzU7qhW+VpWawDUI3jlXE1HNBK+qNRPVrFwTce291EAjaFUjKOc18o/M7GsV8d5LnmXtvxMKQ89CRKERliAUlGpEVIWJBApRDY39RCTMLCoqhPB5EtJKHyFqCgaRmSXMXSHq4DSylEGKRVXYORGR9FivRKHDmcnHj4qIvapWRFQRUSUiNQGVI66IqKy9nxHzVFUn7NyICDsAtkVkA6DTq6trJzc2dk78X//lFcdf/OJXv2oymZrn8r8Z6yr6333BHYHh4H2Ns846ghe/+AWvecYP/sBqp5MtT6ajpaosBwzuMXOPmQsiygnqVOAylzEJUa1CAmEmJiJiIua6rjhzGYkKExGJKDwEtfdwxMhdmNSuqjrq9TJCWkWbAcnaa2uHEyAaOnpVFHnTNTxfbhbyPCEB0x5PaCvU8XxdYrPtslYBHDerWaq6Dt3BquqcE0JQxQq/hgoHz0dERBmkjlkI8LX3PhqfUlUmqpgQ8Wg4HO6MxqPtv/zL/7n5s6/91Zd98Ys3wbkcgFjFyAzMPxHX0WWh8xXAlVc9Cs973k/8zLc+7qqltbXVodZ+UFZlr67KrojPWTQnYkdEzMTsSZk4fu5rx+xYBY5C3ZspqI1TlJEkjdsZHWfw4ucl4rSBsqlEhX4WVUWeO3hfoZYKTIzMhS5ZFYo76oMnQBzzJ9TozMH7GnmeN6MKoYFubmyUonwmEcR7zVyGkGRS5dDAI3U9845ZFCEkougFpf8q1FdVVWWZqzpFMe0P+hN2ndHm1mj3Pe/+i53f+PXfeulnrr2+udZhYNOqRWZg/ildfKIFgemLH3ghHv+4x77iKU95yuDyyx/eP3x4vZvlVEg1yWezWUZEXJYzVrhgVFSdQl1d1xkTO1VxzMxehDlMIVNVl02/CLusaZqjuKo1CUs6lzVJ26BON5+PaipaCmTRu0kbH1V9TN4mmQhq1P4BhG2JrbGGZmOCj2LkQcNFY69NDMfIi3jvXAwVmcNQAGfeOSfMLEWnqKFalWVdnjh+enrDDV8Yf+Sjfz/6q7/6wKs+d/0N0bAsCqwbZmD+CRoZzJvhWnfYs886gksue/DLLrv0kuJBD3xAfu6552T9/oAPHz7shksDzovMsXOuUxQZO5cxI3POOWZ23vswPkREXoJKW1B3E2RZHlTb4hxR2CstjYcS5gKD4QiNe9z0yYmE4Ua0q0uo4X0VpRlCaVw5axoD67oGx+VyzEm6QZqtjs1WteYSiAfIV1VZ11Vdl1VZA/C1V1/WIsePH/enTp2Su+66q77ppluqz157Xfn5z3/xNceOnWiuXXgt2uzjNszAGMB8X5H6uFdoT1jFjPVD6xgO+mELgXNYXlrC+vr6q3u9nmPHGYdQigCQcy7oNzETNGjnOhfCmGY1CubbE6GhVT/MEKX2fm7GgpKyXOrhCa5N2iwZ5qao9ViJ81RKNM/RAM3aE2jUsiKK3x2mH6qqqsfjiT918tTLNzY2UNU1xAcDeerUKYzHk69jqIPYlcpej8UsjBkY4xuETy7O3tRn7Cj6p31t9u7U/nr5FTIDYwbG+P9iePbKMvwvl7XTnpt568+ki19uNePeB28r/bo+xBlPrWd8+8Ke7fZXk263hT2GYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiG8Q/B/w0BuMEZuzYFfgAAAABJRU5ErkJggg==";

const Barcode = ({ color, opacity = 0.4 }) => (
  <div style={{ display: "flex", gap: "1.5px", height: 20, opacity }}>
    {[2, 4, 1, 3, 1, 4, 2, 3, 1, 2, 4, 1].map((w, i) => (
      <div key={i} style={{ width: w, height: "100%", background: color, borderRadius: 0.5 }} />
    ))}
  </div>
);

const Icon = ({ type, size = 24, opacity = 1, color }) => {
  const s = color || `rgba(255,255,255,${opacity})`;
  const p = { width: size, height: size, stroke: s, strokeWidth: 1.8, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (type) {
    case "search":   return <svg {...p} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
    case "archive":  return <svg {...p} viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
    case "close":    return <svg {...p} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "folder":   return <svg {...p} viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>;
    case "stats":    return <svg {...p} viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case "plus":     return <svg {...p} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "ai":       return <svg {...p} viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><circle cx="7.5" cy="14.5" r="1.5" fill={s} stroke="none"/><circle cx="16.5" cy="14.5" r="1.5" fill={s} stroke="none"/></svg>;
    case "trash":    return <svg {...p} viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
    case "home":     return <svg {...p} viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "receipt":  return <svg {...p} viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
    case "inbox":    return <svg {...p} viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
    case "settings": return <svg {...p} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case "bell":     return <svg {...p} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    case "download": return <svg {...p} viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
    case "globe":    return <svg {...p} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case "shield":   return <svg {...p} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "info":     return <svg {...p} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
    case "chevron":  return <svg {...p} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>;
    case "check":    return <svg {...p} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
    case "edit":     return <svg {...p} viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    default: return null;
  }
};

const daysAgo = (d) => { const dt = new Date(); dt.setDate(dt.getDate() - d); return formatDate(dt); };
const fmtMoney = (n, devise) => {
  const sym = devise === "USD" ? "$" : devise === "GBP" ? "£" : devise === "CHF" ? "CHF " : "€";
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + (devise === "CHF" ? "CHF" : sym);
};
const MONTHS_FR = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
const MONTH_IDX = { "janv.":0,"févr.":1,"fev.":1,"mars":2,"avr.":3,"mai":4,"juin":5,"juil.":6,"juil":6,"août":7,"aout":7,"sept.":8,"oct.":9,"nov.":10,"déc.":11,"dec.":11 };
const parseDate = (str) => {
  if (!str) return new Date();
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(str.trim())) return new Date(str + "T00:00:00");
    const pts = str.trim().split(/\s+/);
    if (pts.length >= 3) { const day = parseInt(pts[0]); const yr = parseInt(pts[pts.length - 1]); const mon = MONTH_IDX[pts[1].toLowerCase()] ?? 0; return new Date(yr, mon, day); }
  } catch (e) {}
  return new Date();
};
const formatDate = (d) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
const isoToDisplay = (iso) => iso ? formatDate(new Date(iso + "T00:00:00")) : "";
const PERIODS = [{ label: "7 j", days: 7 }, { label: "1 mois", days: 30 }, { label: "3 mois", days: 90 }, { label: "1 an", days: 365 }, { label: "Tout", days: 36500 }];

const CARD_PALETTES = {
  classic: [{ grad: "linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent: "#1a1a1a", light: true },{ grad: "linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent: "#1a1a1a", light: true },{ grad: "linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent: "#1a1a1a", light: true },{ grad: "linear-gradient(160deg,#FDFCFA,#F0EDE6)", accent: "#1a1a1a", light: true }],
};
const getCardTheme = (uiTheme, idx) => (CARD_PALETTES[uiTheme] || CARD_PALETTES.classic)[idx % 4];

const THEMES = {
  classic: { id: "classic", label: "Classic",  desc: "Ticket",    accent: "#e0e0e0", bg: "#0a0a0a", card: "#141414" },
};

const YF = { main: "#F2D06B", text: "#1A0A00" };
const BODY_H = 58, SHOW_PX = 34;

const INIT_FOLDERS = [
  { id: "a1", label: "Dépenses du mois", sub: "Tickets du quotidien", color: "#C9A84C" },
  { id: "a2", label: "Voyages",           sub: "Billets et transports", color: "#6ee7b7" },
  { id: "a3", label: "Santé",             sub: "Médecin et pharmacie", color: "#f9a8d4" },
];

const INIT_TICKETS = [
  { id: 1, label: "Carrefour",   amount: 47.80,  date: daysAgo(3),  items: ["Yaourts x6", "Pain complet", "Beurre"],             cardTheme: 0, archived: false },
  { id: 2, label: "Free Mobile", amount: 19.99,  date: daysAgo(15), items: ["Abonnement mobile mars"],                            cardTheme: 1, archived: false },
  { id: 3, label: "SNCF",        amount: 124.00, date: daysAgo(8),  items: ["Paris Lyon TGV 2nde cl."],                          cardTheme: 2, archived: false },
  { id: 4, label: "Amazon",      amount: 89.99,  date: daysAgo(5),  items: ["Casque Sony WH-1000XM5", "Cable USB-C"],            cardTheme: 3, archived: false },
  { id: 5, label: "Pharmacie",   amount: 34.60,  date: daysAgo(12), items: ["Doliprane 500mg x30", "Vitamine D"],                cardTheme: 4, archived: false },
  { id: 6, label: "Le Procope",  amount: 68.00,  date: daysAgo(7),  items: ["Menu duo", "Vin rouge Bordeaux"],                   cardTheme: 5, archived: false },
  { id: 7, label: "Leclerc",     amount: 112.30, date: daysAgo(8),  items: ["Viande", "Légumes", "Fromage", "Fruits"],           cardTheme: 6, archived: true,  archiveFolder: "a1" },
  { id: 8, label: "EDF",         amount: 156.40, date: daysAgo(10), items: ["Electricité janv. 2026"],                           cardTheme: 7, archived: true,  archiveFolder: "a1" },
];

// ─── ONBOARDING ─────────────────────────────────────────────────────
const OB_SLIDES = [
  {
    title: "Bienvenue dans\ntikit",
    sub: "Votre portefeuille de tickets numérique. Organisé, rapide, élégant.",
    accent: "#e0e0e0",
    Illus: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={TIKIT_LOGO} alt="tikit" style={{ width: 320, height: 320, objectFit: "contain" }} />
      </div>
    ),
  },
  {
    title: "Scannez vos\ntickets",
    sub: "L'IA lit votre ticket de caisse en quelques secondes et extrait automatiquement toutes les infos.",
    accent: "#e0e0e0",
    Illus: () => (
      <svg viewBox="0 0 220 200" width="220" height="200">
        <rect x="65" y="20" width="90" height="155" rx="18" fill="#111118" stroke="#e0e0e0" strokeWidth="1.5" opacity="0.8"/>
        <rect x="75" y="32" width="70" height="120" rx="8" fill="#e0e0e0" fillOpacity="0.03"/>
        <line x1="78" y1="35" x2="88" y2="35" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="78" y1="35" x2="78" y2="45" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="142" y1="35" x2="132" y2="35" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="142" y1="35" x2="142" y2="45" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="78" y1="142" x2="88" y2="142" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="78" y1="142" x2="78" y2="132" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="142" y1="142" x2="132" y2="142" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="142" y1="142" x2="142" y2="132" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="78" y1="90" x2="142" y2="90" stroke="#e0e0e0" strokeWidth="1.5" opacity="0.9"/>
        <rect x="78" y="83" width="64" height="14" fill="#e0e0e0" opacity="0.06" rx="2"/>
        <rect x="86" y="52" width="48" height="5" rx="2.5" fill="#e0e0e0" opacity="0.4"/>
        <rect x="86" y="62" width="35" height="3" rx="1.5" fill="white" opacity="0.12"/>
        <rect x="86" y="69" width="28" height="3" rx="1.5" fill="white" opacity="0.08"/>
        <rect x="110" y="62" width="22" height="7" rx="3.5" fill="#e0e0e0" opacity="0.3"/>
        <rect x="86" y="112" width="48" height="3" rx="1.5" fill="white" opacity="0.08"/>
        <rect x="86" y="119" width="38" height="3" rx="1.5" fill="white" opacity="0.06"/>
        <rect x="86" y="126" width="52" height="5" rx="2.5" fill="#e0e0e0" opacity="0.25"/>
        <circle cx="170" cy="60" r="18" fill="#e0e0e0" opacity="0.1"/>
        <circle cx="170" cy="60" r="14" fill="#e0e0e0" opacity="0.2"/>
        <text x="170" y="65" textAnchor="middle" fill="#e0e0e0" fontSize="11" fontWeight="bold" fontFamily="monospace">AI</text>
        <circle cx="50" cy="80" r="3" fill="#e0e0e0" opacity="0.35"/>
        <circle cx="185" cy="110" r="4" fill="#e0e0e0" opacity="0.25"/>
      </svg>
    ),
  },
  {
    title: "Organisez\nvos dépenses",
    sub: "Classez vos tickets dans des dossiers, consultez vos stats et exportez en CSV.",
    accent: "#e0e0e0",
    Illus: () => (
      <svg viewBox="0 0 220 200" width="220" height="200">
        <rect x="30" y="72" width="24" height="10" rx="5" fill="#c8c8c8" opacity="0.8"/>
        <rect x="30" y="80" width="60" height="40" rx="10" fill="#c8c8c8" fillOpacity="0.15" stroke="#c8c8c8" strokeWidth="1.5"/>
        <rect x="38" y="92" width="36" height="4" rx="2" fill="#c8c8c8" opacity="0.5"/>
        <rect x="100" y="62" width="22" height="10" rx="5" fill="#e0e0e0" opacity="0.8"/>
        <rect x="100" y="70" width="65" height="45" rx="10" fill="#e0e0e0" fillOpacity="0.12" stroke="#e0e0e0" strokeWidth="1.5"/>
        <rect x="108" y="83" width="42" height="4" rx="2" fill="#e0e0e0" opacity="0.5"/>
        <rect x="58" y="114" width="22" height="10" rx="5" fill="#b0b0b0" opacity="0.8"/>
        <rect x="58" y="120" width="62" height="42" rx="10" fill="#b0b0b0" fillOpacity="0.12" stroke="#b0b0b0" strokeWidth="1.5"/>
        <rect x="66" y="133" width="38" height="4" rx="2" fill="#b0b0b0" opacity="0.5"/>
        <g transform="translate(135,68)">
          <rect x="0" y="22" width="8" height="28" rx="3" fill="#e0e0e0" opacity="0.4"/>
          <rect x="12" y="5" width="8" height="45" rx="3" fill="#e0e0e0" opacity="0.6"/>
          <rect x="24" y="15" width="8" height="35" rx="3" fill="#e0e0e0" opacity="0.5"/>
          <rect x="36" y="0" width="8" height="50" rx="3" fill="#e0e0e0" opacity="0.75"/>
          <rect x="48" y="10" width="8" height="40" rx="3" fill="#e0e0e0" opacity="0.65"/>
          <line x1="0" y1="52" x2="60" y2="52" stroke="white" strokeWidth="0.5" opacity="0.15"/>
        </g>
        <rect x="145" y="138" width="52" height="26" rx="8" fill="#e0e0e0" fillOpacity="0.12" stroke="#e0e0e0" strokeWidth="1"/>
        <text x="171" y="155" textAnchor="middle" fill="#e0e0e0" fontSize="9" fontWeight="600" fontFamily="sans-serif">CSV</text>
        <circle cx="35" cy="55" r="3" fill="#e0e0e0" opacity="0.35"/>
        <circle cx="185" cy="75" r="2" fill="#e0e0e0" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: "Prêt à\ncommencer ?",
    sub: "Définissez votre prénom et votre devise préférée pour personnaliser l'expérience.",
    accent: "#e0e0e0",
    Illus: () => (
      <svg viewBox="0 0 220 200" width="220" height="200">
        <defs><radialGradient id="rg1ob" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e0e0e0" stopOpacity="0.2"/><stop offset="100%" stopColor="#e0e0e0" stopOpacity="0"/></radialGradient></defs>
        <circle cx="110" cy="96" r="70" fill="url(#rg1ob)"/>
        <circle cx="110" cy="92" r="40" fill="none" stroke="#e0e0e0" strokeWidth="1" opacity="0.12"/>
        <circle cx="110" cy="92" r="34" fill="#1a1a1a" stroke="#e0e0e0" strokeWidth="1.2" opacity="0.8"/>
        <circle cx="110" cy="82" r="15" fill="#e0e0e0" opacity="0.4"/>
        <path d="M88 108 Q110 96 132 108" fill="#e0e0e0" opacity="0.25"/>
        <circle cx="142" cy="68" r="14" fill="#1a1a1a" stroke="#e0e0e0" strokeWidth="1.2"/>
        <polyline points="136,68 140,72 148,63" fill="none" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="38" cy="80" r="4" fill="#e0e0e0" opacity="0.3"/>
        <circle cx="58" cy="148" r="3" fill="#e0e0e0" opacity="0.2"/>
        <circle cx="175" cy="70" r="3" fill="#e0e0e0" opacity="0.25"/>
        <circle cx="185" cy="128" r="5" fill="#e0e0e0" opacity="0.15"/>
        <line x1="50" y1="60" x2="50" y2="68" stroke="#e0e0e0" strokeWidth="1.2" opacity="0.25" strokeLinecap="round"/>
        <line x1="46" y1="64" x2="54" y2="64" stroke="#e0e0e0" strokeWidth="1.2" opacity="0.25" strokeLinecap="round"/>
        <line x1="170" y1="100" x2="170" y2="108" stroke="#e0e0e0" strokeWidth="1.2" opacity="0.2" strokeLinecap="round"/>
        <line x1="166" y1="104" x2="174" y2="104" stroke="#e0e0e0" strokeWidth="1.2" opacity="0.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const Onboarding = ({ onFinish }) => {
  const [slide, setSlide]       = useState(0);
  const [anim, setAnim]         = useState("in");
  const [userName, setUserName] = useState("");
  const [devise, setDevise]     = useState("EUR");
  const [busy, setBusy]         = useState(false);
  const cur = OB_SLIDES[slide];
  const isLast = slide === OB_SLIDES.length - 1;

  const goTo = (n) => {
    if (busy || n < 0 || n >= OB_SLIDES.length) return;
    setBusy(true); setAnim("out");
    setTimeout(() => { setSlide(n); setAnim("in"); setBusy(false); }, 240);
  };

  const Illus = cur.Illus;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "0 0 52px", overflow: "hidden", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px)" }}>
      <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, " + cur.accent + "18 0%, transparent 70%)", transition: "background 0.5s", pointerEvents: "none" }} />
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: "18px 22px 0", zIndex: 2 }}>
        {!isLast && <button onClick={() => onFinish({ name: "Vous", devise: "EUR" })} style={{ background: "none", border: "none", color: "#e0e0e0", opacity: 0.4, fontSize: 12, cursor: "pointer", fontFamily: "Outfit,sans-serif", letterSpacing: 1 }}>Passer</button>}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 16, animation: anim === "in" ? "obIn 0.3s cubic-bezier(0.22,1,0.36,1) both" : "obOut 0.22s ease-in both" }}>
        <Illus />
      </div>
      <div style={{ width: "100%", padding: "0 28px", marginTop: -80, animation: anim === "in" ? "obFadeUp 0.36s cubic-bezier(0.22,1,0.36,1) 0.07s both" : "obOut 0.2s ease-in both" }}>
        <h2 style={{ margin: "0 0 10px", color: "white", fontSize: 30, fontWeight: 800, fontFamily: "Outfit,sans-serif", letterSpacing: -1, lineHeight: 1.18, whiteSpace: "pre-line" }}>{cur.title}</h2>
        <p style={{ margin: "0 0 20px", color: "rgba(255,255,255,0.45)", fontSize: 14, fontFamily: "Outfit,sans-serif", lineHeight: 1.6 }}>{cur.sub}</p>
        {isLast && (
          <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>Votre prénom</div>
              <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Ex : Marie" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid " + cur.accent + "40", background: cur.accent + "08", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>Devise</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["EUR", "USD", "GBP", "CHF"].map(d => (
                  <button key={d} onClick={() => setDevise(d)} style={{ flex: 1, height: 38, borderRadius: 10, border: "none", cursor: "pointer", background: devise === d ? cur.accent + "25" : "rgba(255,255,255,0.06)", color: devise === d ? cur.accent : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: devise === d ? 700 : 400, fontFamily: "Outfit,sans-serif", transition: "all 0.18s", outline: devise === d ? ("1px solid " + cur.accent + "50") : "none" }}>{d}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        <button onClick={() => isLast ? onFinish({ name: userName.trim() || "Vous", devise }) : goTo(slide + 1)} style={{ width: "100%", height: 52, borderRadius: 16, border: "none", background: "linear-gradient(135deg," + cur.accent + "cc," + cur.accent + ")", color: "#000", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit,sans-serif", boxShadow: "0 6px 24px " + cur.accent + "30", marginBottom: 20 }}>
          {isLast ? "Démarrer" : "Suivant"}
        </button>
        <div style={{ display: "flex", justifyContent: "center", gap: 7 }}>
          {OB_SLIDES.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{ width: i === slide ? 22 : 7, height: 7, borderRadius: 4, background: i === slide ? cur.accent : "rgba(255,255,255,0.2)", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", cursor: "pointer" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── TICKET CARD ─────────────────────────────────────────────────
// ─── SWIPE ROW ────────────────────────────────────────────────────
const SwipeRow = ({ onDelete, onArchive, children }) => {
  const [offsetX, setOffsetX] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startX = React.useRef(0);
  const threshold = 72;

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; setDragging(true); };
  const onTouchMove  = (e) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX.current;
    if (dx < 0) setOffsetX(Math.max(dx, -140));
  };
  const onTouchEnd   = () => {
    setDragging(false);
    if (offsetX < -threshold * 1.5 && onDelete)  { setOffsetX(0); onDelete();  return; }
    if (offsetX < -threshold && onArchive) { setOffsetX(0); onArchive(); return; }
    setOffsetX(0);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 16, marginBottom: 4 }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", alignItems: "stretch" }}>
        <div style={{ width: 68, background: "linear-gradient(135deg,#F2D06B,#E8C85A)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onArchive}>
          <Icon type="archive" size={18} color="#0A0A00" />
        </div>
        <div style={{ width: 68, background: "rgba(255,59,48,0.85)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0 16px 16px 0", cursor: "pointer" }} onClick={onDelete}>
          <Icon type="trash" size={18} color="white" />
        </div>
      </div>
      <div
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(${offsetX}px)`, transition: dragging ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1)", position: "relative", zIndex: 1 }}
      >
        {children}
      </div>
    </div>
  );
};

const PEEK = 96, CARD_H = 210;

const TicketCard = ({ ticket, index, total, onClick, onPhotoClick, uiTheme }) => {
  const ct = getCardTheme(uiTheme, ticket.cardTheme || 0);
  const textColor = ct.light ? "rgba(20,10,0,0.9)" : "rgba(255,255,255,0.95)";
  const subColor = ct.light ? "rgba(20,10,0,0.45)" : "rgba(255,255,255,0.35)";
  const ac = ct.accent;
  const bottomOffset = (total - 1 - index) * PEEK;
  return (
    <div className="wcard-wrapper" onClick={onClick} style={{ position: "absolute", bottom: bottomOffset, left: 0, right: 0, height: CARD_H, cursor: "pointer", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", zIndex: index, filter: ct.light ? "drop-shadow(0 -2px 1px rgba(0,0,0,0.14))" : "drop-shadow(0 -2px 1px rgba(0,0,0,0.35)) drop-shadow(0 20px 30px rgba(0,0,0,0.6))" }}>
      {ticket.unread && <div style={{ position: "absolute", top: 12, right: 12, zIndex: 20, width: 11, height: 11, borderRadius: "50%", background: "#ff3b30", boxShadow: "0 0 8px rgba(255,59,48,0.9)", animation: "pulse 1.5s infinite", pointerEvents: "none" }} />}
      <div className="receipt-shape-both" style={{ width: "100%", height: "100%", background: ct.grad, border: "1px solid " + (ct.light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"), padding: "18px 20px 16px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: ac + "20", border: "1px solid " + ac + "30", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon type="receipt" size={20} color={ac} />
            </div>
            {ticket.photo && (
              <div style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: "#10B981", border: "2px solid #111", boxShadow: "0 0 5px rgba(16,185,129,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="6" height="6" viewBox="0 0 8 8"><path d="M1 4.5L3 6.5L7 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: textColor, fontSize: 17, fontWeight: 700, fontFamily: "'Courier Prime',monospace", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ticket.label}</div>
            <div style={{ color: subColor, fontSize: 9, fontFamily: "'Courier Prime',monospace", marginTop: 2 }}>{ticket.date}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ color: ac, fontSize: 18, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: -1, lineHeight: 1 }}>{fmtMoney(ticket.amount, ticket.devise || "EUR")}</div>
            <div style={{ color: subColor, fontSize: 7, fontFamily: "'Space Mono',monospace", marginTop: 1, textTransform: "uppercase" }}>{ticket.devise || "EUR"}</div>
          </div>
        </div>
        <div style={{ borderTop: "1px dashed " + subColor, marginBottom: 6, opacity: 0.4 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          {[{ k: "N° ticket", v: ticket.numTicket || "—" }, { k: "TVA", v: ticket.tva > 0 ? fmtMoney(ticket.tva, ticket.devise || "EUR") : "—" }, { k: "Articles", v: ticket.items && ticket.items.length > 0 ? ticket.items[0].slice(0, 22) + "…" : "—" }].map(({ k, v }) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", color: subColor, fontSize: 10, fontFamily: "'Courier Prime',monospace" }}>
              <span style={{ opacity: 0.6 }}>{k}</span><span>{v}</span>
            </div>
          ))}
          {ticket.items && ticket.items.length > 1 && <div style={{ color: subColor, fontSize: 9, fontStyle: "italic", fontFamily: "'Courier Prime',monospace", opacity: 0.5 }}>+ {ticket.items.length - 1} articles</div>}
        </div>
        <div style={{ borderTop: "1px dashed " + subColor, marginTop: 4, paddingTop: 5, opacity: 0.4 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Barcode color={textColor} opacity={0.35} />
          <div style={{ color: subColor, fontSize: 7, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>TXN-{String(ticket.id).padStart(9, "0")}</div>
        </div>
      </div>
    </div>
  );
};

// ─── ARCHIVE FOLDER ───────────────────────────────────────────────
const ArchiveFolder = ({ folder, tickets, index, isOpen, onToggle, onEdit, onDelete, onTicketClick, uiTheme }) => {
  const [photoView, setPhotoView] = React.useState(null);
  const exportCSV = (e) => {
    e.stopPropagation();
    const header = "Enseigne,Date,Total,N° Ticket,TVA,Devise\n";
    const rows = tickets.map(t => [t.label, t.date, t.amount, t.numTicket || "", t.tva || 0, t.devise || "EUR"].map(v => '"' + v + '"').join(",")).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = folder.label + ".csv"; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div style={{ position: "relative", zIndex: isOpen ? 100 : 10 + index, marginBottom: isOpen ? 12 : -(BODY_H - SHOW_PX), transition: "margin-bottom 0.4s cubic-bezier(0.4,0,0.2,1),transform 0.3s ease", transform: isOpen ? "scale(1.012)" : "scale(1)" }}>
      {photoView && <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setPhotoView(null)}><img src={photoView} alt="Ticket" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 12, objectFit: "contain" }} /></div>}
      <div style={{ width: 80, height: 20, background: "linear-gradient(to top," + YF.main + ",#FBF2A8)", borderRadius: "8px 8px 0 0", marginLeft: "auto", marginRight: 20 + index * 8, border: "1px solid rgba(139,96,32,0.18)", borderBottom: "none" }} />
      <div className="acard" onClick={onToggle} style={{ background: "linear-gradient(175deg,#F7E070 0%,#EEBF35 65%,#D9A820 100%)", borderRadius: 14, cursor: "pointer", boxShadow: isOpen ? "0 16px 36px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.25)", border: "1px solid rgba(139,96,32,0.22)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 20, background: "linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 100%)", borderRadius: "14px 14px 0 0", pointerEvents: "none" }} />
        <div style={{ height: BODY_H, display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(100,60,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon type="folder" size={16} color={YF.text} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: YF.text, fontSize: 13, fontWeight: 700, fontFamily: "Outfit,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{folder.label}</div>
            <div style={{ color: "rgba(80,40,0,0.55)", fontSize: 9.5, fontFamily: "Outfit,sans-serif", marginTop: 2 }}>{tickets.length} ticket{tickets.length !== 1 ? "s" : ""}</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={exportCSV} style={{ border: "none", background: "rgba(100,60,0,0.15)", borderRadius: 7, padding: "5px 8px", color: "rgba(80,40,0,0.8)", fontSize: 10, cursor: "pointer", fontFamily: "Outfit,sans-serif", fontWeight: 600 }}>CSV</button>
            <button onClick={e => { e.stopPropagation(); onEdit(); }} style={{ border: "none", background: "rgba(100,60,0,0.12)", borderRadius: 7, padding: "5px 8px", color: "rgba(80,40,0,0.7)", fontSize: 10, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Modifier</button>
            <svg style={{ transition: "transform 0.3s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", opacity: 0.5 }} width="10" height="16" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke={YF.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
      <div style={{ maxHeight: isOpen ? 600 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1),opacity 0.3s", opacity: isOpen ? 1 : 0 }}>
        <div style={{ background: "#1a1a1a", borderRadius: "0 0 14px 14px", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "6px 0 6px" }}>
          {tickets.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", padding: "16px 0", fontSize: 12, fontFamily: "Outfit,sans-serif" }}>Aucun ticket archivé</div>}
          {tickets.map((t, i) => {
            const ct = getCardTheme(uiTheme, t.cardTheme || 0);
            return (
              <div key={t.id} onClick={() => onTicketClick && onTicketClick(t)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", animation: "rowSlide 0.3s cubic-bezier(0.22,1,0.36,1) " + (i * 0.05) + "s both", borderBottom: i < tickets.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer" }}>
                {t.photo ? <img src={t.photo} alt="" onClick={() => setPhotoView(t.photo)} style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", display: "block", flexShrink: 0 }} /> : <div style={{ width: 36, height: 36, borderRadius: 8, background: ct.grad, flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "white", fontSize: 13, fontWeight: 500, fontFamily: "Outfit,sans-serif" }}>{t.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "Outfit,sans-serif", marginTop: 1 }}>{t.date} · {t.devise || "EUR"}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: "white", fontSize: 13, fontFamily: "Outfit,sans-serif" }}>{fmtMoney(t.amount, t.devise || "EUR")}</div>
                  {t.tva > 0 && <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "Outfit,sans-serif" }}>TVA {fmtMoney(t.tva, t.devise || "EUR")}</div>}
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 4, padding: "8px 14px 0" }}>
            <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{ border: "none", background: "rgba(220,38,38,0.1)", borderRadius: 8, padding: "7px 12px", color: "#b91c1c", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Supprimer ce dossier</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BarChart = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.v), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: i === data.length - 1 ? color : "rgba(255,255,255,0.1)", height: Math.max(4, (d.v / max) * 52), transition: "height 0.6s ease", minHeight: 4 }} />
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, fontFamily: "Outfit,sans-serif" }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};

const Toggle = ({ value, onChange, accent }) => (
  <div onClick={() => onChange(!value)} style={{ width: 46, height: 26, borderRadius: 13, background: value ? (accent || "#C9A84C") : "rgba(255,255,255,0.15)", transition: "background 0.25s", cursor: "pointer", flexShrink: 0, position: "relative" }}>
    <div style={{ width: 20, height: 20, borderRadius: 10, background: "white", position: "absolute", top: 3, left: value ? 23 : 3, transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
  </div>
);

const SRow = ({ icon, label, sub, right, onClick, danger, iconBg, noChevron }) => (
  <div className="srow" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px", cursor: onClick ? "pointer" : "default" }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg || "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon type={icon} size={17} color={danger ? "#ff3b30" : "rgba(255,255,255,0.75)"} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: danger ? "#ff3b30" : "white", fontSize: 14, fontFamily: "Outfit,sans-serif", fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "Outfit,sans-serif", marginTop: 1 }}>{sub}</div>}
    </div>
    {right !== undefined && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "Outfit,sans-serif", flexShrink: 0 }}>{right}</div>}
    {onClick && !noChevron && <Icon type="chevron" size={16} opacity={0.25} />}
  </div>
);

const SSection = ({ title, children }) => (
  <div style={{ marginBottom: 18 }}>
    {title && <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: "Outfit,sans-serif", padding: "0 16px", marginBottom: 6 }}>{title}</div>}
    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
      {React.Children.toArray(children).map((child, i, arr) => (
        <div key={i} style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>{child}</div>
      ))}
    </div>
  </div>
);

function loadStorage(key, fallback) {
  try { const raw = localStorage.getItem(key); if (raw === null) return fallback; const parsed = JSON.parse(raw); if (parsed === null || parsed === undefined) return fallback; return parsed; } catch { return fallback; }
}
function usePersist(key, init) {
  const [val, setVal] = useState(() => loadStorage(key, init));
  const set = (updater) => { setVal(prev => { const next = typeof updater === "function" ? updater(prev) : updater; try { localStorage.setItem(key, JSON.stringify(next)); } catch {} return next; }); };
  return [val, set];
}

export default function App() {
  const [ticketsRaw,     setTickets]     = usePersist("wallet_tickets",  []);
  const [foldersRaw,     setFolders]     = usePersist("wallet_folders",  INIT_FOLDERS);
  const [uiTheme,        setUiTheme]     = usePersist("wallet_theme",    "classic");
  const [profileRaw,     setProfile]     = usePersist("wallet_profile",  { name: "Vous", devise: "EUR" });
  const [prefsRaw,       setPrefs]       = usePersist("wallet_prefs",    { notifUnread: true, notifBudget: false, budgetAlert: 500 });
  const [onboardDone,    setOnboardDone] = usePersist("wallet_onboard",  false);
  const [apiKey,         setApiKey]      = usePersist("wallet_apikey",   "");
  const [view,           setView]        = useState("home");
  const [viewAnim,       setViewAnim]    = useState("in");
  const [activeTab,      setActiveTab]   = useState("home");
  const [addSheet,       setAddSheet]    = useState(false);
  const [addMode,        setAddMode]     = useState(null);
  const [detailT,        setDetailT]     = useState(null);
  const [photoViewer,    setPhotoViewer] = useState(null);
  const [archivePick,    setArchivePick] = useState(null);
  const [folderModal,    setFolderModal] = useState(false);
  const [editFolder,     setEditFolder]  = useState(null);
  const [folderForm,     setFolderForm]  = useState({ label: "", sub: "" });
  const [archiveOpen,    setArchiveOpen] = useState(null);
  const [form,           setForm]        = useState({ label: "", amount: "", date: "", items: "" });
  const [searchQ,        setSearchQ]     = useState("");
  const [archiveSearchQ, setArchiveSearchQ] = useState("");
  const [isOnline,       setIsOnline]    = useState(navigator.onLine);
  const [period,         setPeriod]      = useState(1);
  const [statPeriod,     setStatPeriod]  = useState(2);
  const [toast,          setToast]       = useState(null);
  const [aiPhase,        setAiPhase]     = useState(0);
  const [aiResult,       setAiResult]    = useState(null);
  const [scanPct,        setScanPct]     = useState(0);
  const [editNameMode,   setEditNameMode]= useState(false);
  const [editNameVal,    setEditNameVal] = useState("");
  const [sortBy,         setSortBy]      = useState("date");
  const [editTicket,     setEditTicket]  = useState(null);
  const [editForm,       setEditForm]    = useState({ label: "", amount: "", date: "", items: "" });
  const [confirmReset,   setConfirmReset]= useState(false);
  const [showPrivacy,    setShowPrivacy] = useState(false);
  const [showKeyInput,   setShowKeyInput]= useState(false);
  const [keyDraft,       setKeyDraft]    = useState("");
  const fileRef   = useRef();
  const searchRef = useRef();

  const tickets     = Array.isArray(ticketsRaw) ? ticketsRaw : [];
  const folders     = Array.isArray(foldersRaw) ? foldersRaw : INIT_FOLDERS;
  const profile     = (profileRaw && typeof profileRaw === "object" && !Array.isArray(profileRaw)) ? { name: "Vous", devise: "EUR", ...profileRaw } : { name: "Vous", devise: "EUR" };
  const prefs       = (prefsRaw && typeof prefsRaw === "object" && !Array.isArray(prefsRaw)) ? { notifUnread: true, notifBudget: false, budgetAlert: 500, ...prefsRaw } : { notifUnread: true, notifBudget: false, budgetAlert: 500 };
  const theme       = THEMES[uiTheme] || THEMES.classic;

  const changeView = (v, cb) => { setViewAnim("out"); setTimeout(() => { setView(v); setViewAnim("in"); if (cb) cb(); }, 150); };
  const goSearch = () => changeView("search", () => setTimeout(() => searchRef.current && searchRef.current.focus(), 60));
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  // Online/offline detection
  React.useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  const archivedTickets = useMemo(() => tickets.filter(t => t.archived), [tickets]);
  const statDays = PERIODS[statPeriod].days;
  const statCutoff = useMemo(() => { const d = new Date(); d.setDate(d.getDate() - statDays); return d; }, [statDays]);
  const statData = useMemo(() => {
    const n = new Date();
    const filtered = tickets.filter(t => parseDate(t.date) >= statCutoff);
    const ttl = filtered.reduce((s, t) => s + t.amount, 0);
    const biggest = [...filtered].sort((a, b) => b.amount - a.amount)[0];
    const bars = [];
    if (statDays <= 31) {
      const nb = statDays <= 7 ? 7 : 6, step = Math.floor(statDays / nb);
      for (let i = nb - 1; i >= 0; i--) {
        const from = new Date(n); from.setDate(from.getDate() - i * step - step + 1); from.setHours(0, 0, 0, 0);
        const to = new Date(n); to.setDate(to.getDate() - i * step); to.setHours(23, 59, 59, 999);
        const v = tickets.filter(t => { const d = parseDate(t.date); return d >= from && d <= to; }).reduce((s, t) => s + t.amount, 0);
        bars.push({ l: statDays <= 7 ? from.toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 3) : from.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }).replace(" ", "."), v });
      }
    } else {
      const nb = statDays <= 90 ? 3 : 12;
      for (let i = nb - 1; i >= 0; i--) {
        const m = new Date(n.getFullYear(), n.getMonth() - i, 1);
        const mEnd = new Date(n.getFullYear(), n.getMonth() - i + 1, 0); mEnd.setHours(23, 59, 59, 999);
        const v = tickets.filter(t => { const d = parseDate(t.date); return d >= m && d <= mEnd; }).reduce((s, t) => s + t.amount, 0);
        bars.push({ l: MONTHS_FR[m.getMonth()], v });
      }
    }
    return { bars, total: ttl, count: filtered.length, biggest };
  }, [tickets, statCutoff, statDays]);

  const periodDays = PERIODS[period].days;
  const cutoff = useMemo(() => { const d = new Date(); d.setDate(d.getDate() - periodDays); return d; }, [periodDays]);
  const activeTickets = useMemo(() => {
    const filtered = tickets.filter(t => !t.archived && parseDate(t.date) >= cutoff);
    return filtered.sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "label") return a.label.localeCompare(b.label);
      return parseDate(b.date) - parseDate(a.date);
    });
  }, [tickets, cutoff, sortBy]);
  const total = activeTickets.length;
  const stackH = total > 0 ? CARD_H + PEEK * (total - 1) : 100;
  const periodStats = useMemo(() => ({ count: activeTickets.length, total: activeTickets.reduce((s, t) => s + t.amount, 0) }), [activeTickets]);
  const searchResults = useMemo(() => { if (!searchQ.trim()) return []; const q = searchQ.toLowerCase(); return tickets.filter(t => t.label.toLowerCase().includes(q)); }, [searchQ, tickets]);
  const unreadCount = tickets.filter(t => !t.archived && t.unread).length;
  const nextCardTheme = () => tickets.filter(t => !t.archived).length % 4;

  const submitManual = () => {
    if (!form.label || !form.amount) return;
    const t = { id: Date.now(), label: form.label.trim(), amount: parseFloat(form.amount.replace(",", ".") || 0), date: form.date ? isoToDisplay(form.date) : formatDate(new Date()), items: form.items ? form.items.split(",").map(s => s.trim()).filter(Boolean) : [], cardTheme: nextCardTheme(), archived: false, unread: true, devise: profile.devise || "EUR" };
    setTickets(prev => [t, ...prev]); setForm({ label: "", amount: "", date: "", items: "" }); setAddMode(null); setAddSheet(false); showToast("Ticket ajouté");
  };
  const deleteTicket    = (id) => { setTickets(prev => prev.filter(t => t.id !== id)); setDetailT(null); showToast("Ticket supprimé"); };
  const archiveTicket   = (tid, fid) => { setTickets(prev => prev.map(t => t.id === tid ? { ...t, archived: true, archiveFolder: fid } : t)); setArchivePick(null); setDetailT(null); showToast("Ticket archivé"); };
  const unarchiveTicket = (id) => { setTickets(prev => prev.map(t => t.id === id ? { ...t, archived: false, archiveFolder: undefined } : t)); setDetailT(null); showToast("Remis dans le wallet"); };
  const saveFolder = () => {
    if (!folderForm.label) return;
    if (editFolder) { setFolders(prev => prev.map(f => f.id === editFolder ? { ...f, ...folderForm } : f)); showToast("Dossier modifié"); }
    else { const cols = ["#C9A84C", "#6ee7b7", "#f9a8d4", "#93c5fd", "#c4b5fd"]; setFolders(prev => [...prev, { id: "f" + Date.now(), label: folderForm.label, sub: folderForm.sub || "", color: cols[prev.length % cols.length] }]); showToast("Dossier créé"); }
    setFolderModal(false); setEditFolder(null); setFolderForm({ label: "", sub: "" });
  };
  const deleteFolder = (id) => { setFolders(prev => prev.filter(f => f.id !== id)); setTickets(prev => prev.map(t => t.archiveFolder === id ? { ...t, archived: false, archiveFolder: undefined } : t)); setArchiveOpen(null); showToast("Dossier supprimé"); };
  const exportAllCSV = () => {
    const header = "Enseigne,Date,Total,Devise,Archivé\n";
    const rows = tickets.map(t => [t.label, t.date, t.amount, t.devise || "EUR", t.archived ? "Oui" : "Non"].map(v => '"' + v + '"').join(",")).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "wallet_export.csv"; a.click(); URL.revokeObjectURL(url);
    showToast("Export téléchargé");
  };

  const exportTicketPDF = (t) => {
    const items = (t.items || []).map(i => `<tr><td style="padding:6px 0;border-bottom:1px solid #eee;font-family:monospace;font-size:13px;color:#333">${i}</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;font-family:monospace;font-size:13px;color:#333">—</td></tr>`).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ticket ${t.label}</title><style>
      body{margin:0;background:#fff;display:flex;justify-content:center;padding:40px 20px;font-family:Arial,sans-serif}
      .receipt{width:320px;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
      .header{background:#1a1a1a;color:#fff;padding:24px 20px 20px}
      .logo{font-size:11px;letter-spacing:3px;opacity:0.5;text-transform:uppercase;margin-bottom:6px}
      .shop{font-size:22px;font-weight:700;letter-spacing:-0.5px}
      .date{font-size:11px;opacity:0.5;margin-top:4px;font-family:monospace}
      .amount{font-size:28px;font-weight:700;font-family:monospace;color:#e0e0e0;text-align:right}
      .divider{border:none;border-top:1px dashed #e0e0e0;margin:0}
      .body{padding:16px 20px}
      .row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f5f5f5;font-size:12px}
      .row .k{color:#999}
      .row .v{font-family:monospace;font-weight:600;color:#333}
      .items-title{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#bbb;margin:14px 0 6px}
      table{width:100%;border-collapse:collapse}
      .barcode{display:flex;gap:2px;height:32px;margin-top:16px;padding-top:12px;border-top:1px dashed #e0e0e0;align-items:flex-end}
      .bar{border-radius:1px;background:#1a1a1a}
      .txn{font-family:monospace;font-size:8px;color:#bbb;text-align:right;margin-top:6px}
      .footer{background:#f9f9f9;padding:12px 20px;text-align:center;font-size:10px;color:#bbb;letter-spacing:1px;border-top:1px solid #eee}
      @media print{body{padding:0}.receipt{box-shadow:none;border:none;width:100%}}
    </style></head><body>
      <div class="receipt">
        <div class="header">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div><div class="logo">tikit</div><div class="shop">${t.label}</div><div class="date">${t.date}</div></div>
            <div class="amount">${t.amount.toFixed(2)} ${t.devise || "EUR"}</div>
          </div>
        </div>
        <hr class="divider">
        <div class="body">
          ${[["N° ticket", t.numTicket || "—"], ["TVA", t.tva > 0 ? t.tva.toFixed(2) + " " + (t.devise || "EUR") : "—"], ["Devise", t.devise || "EUR"]].map(([k,v]) => `<div class="row"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("")}
          ${t.items && t.items.length > 0 ? `<div class="items-title">Articles</div><table>${items}</table>` : ""}
          <div class="barcode">${[2,4,1,3,1,4,2,3,1,2,4,1].map(w => `<div class="bar" style="width:${w*2}px;height:${20+Math.random()*12}px"></div>`).join("")}</div>
          <div class="txn">TXN-${String(t.id).padStart(9,"0")}</div>
        </div>
        <div class="footer">TIKIT · Données locales · ${new Date().getFullYear()}</div>
      </div>
      <script>window.onload=()=>{window.print()}</script>
    </body></html>`;
    const w = window.open("", "_blank"); w.document.write(html); w.document.close();
  };

  const triggerAiScan = () => { if (fileRef.current) fileRef.current.click(); };
  const updateTicket = () => {
    if (!editForm.label || !editForm.amount) return;
    setTickets(prev => prev.map(t => t.id === editTicket ? { ...t, label: editForm.label.trim(), amount: parseFloat(editForm.amount.replace(",", ".") || 0), date: editForm.date ? isoToDisplay(editForm.date) : t.date, items: editForm.items ? editForm.items.split(",").map(s => s.trim()).filter(Boolean) : t.items } : t));
    setEditTicket(null); setDetailT(null); showToast("Ticket modifié");
  };
  const onFile = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    e.target.value = "";
    if (!apiKey || !apiKey.startsWith("sk-ant-")) { setAddSheet(false); setAddMode(null); showToast("Clé API manquante — configurez-la dans Réglages"); return; }
    setAddSheet(false); setAddMode(null); setAiPhase(1); setScanPct(0);
    const timeout = setTimeout(() => { setAiPhase(0); setAiResult(null); showToast("Scan expiré — réessayez"); }, 30000);
    try {
      setScanPct(15);
      const { b64, mediaType } = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => { const dataUrl = reader.result; const [header, data] = dataUrl.split(","); const mt = header.match(/data:([^;]+)/)?.[1] || "image/jpeg"; resolve({ b64: data, mediaType: mt }); };
        reader.onerror = reject; reader.readAsDataURL(file);
      });
      const photoB64 = await new Promise(resolve => {
        const img = new Image(); img.onload = () => { const c = document.createElement("canvas"); const MAX = 800; let w = img.width, h = img.height; if (w > MAX || h > MAX) { if (w > h) { h = Math.round(h * MAX / w); w = MAX; } else { w = Math.round(w * MAX / h); h = MAX; } } c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h); resolve(c.toDataURL("image/jpeg", 0.72)); };
        img.onerror = () => resolve(null); img.src = "data:" + mediaType + ";base64," + b64;
      });
      setAiPhase(2); setScanPct(55);
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-opus-4-5", max_tokens: 1024, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: mediaType, data: b64 } }, { type: "text", text: 'Analyse ce ticket de caisse et extrait les informations en JSON uniquement, sans markdown:\n{"label":"nom commerce max 30 chars","amount":montant_numerique,"date":"JJ/MM/AAAA","tva":montant_tva_ou_0,"devise":"EUR","numTicket":"numero ou vide","items":["article1","article2"]}' }] }] })
      });
      setScanPct(85);
      if (!response.ok) { const err = await response.json().catch(() => ({})); throw new Error(err?.error?.message || "Erreur API " + response.status); }
      const data = await response.json();
      const rawText = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
      setScanPct(100);
      const parsedDate = parsed.date ? (parsed.date.includes("/") ? new Date(parsed.date.split("/").reverse().join("-") + "T00:00:00") : new Date(parsed.date + "T00:00:00")) : new Date();
      setAiResult({ label: (parsed.label || "Ticket").slice(0, 30), amount: parseFloat(parsed.amount) || 0, date: formatDate(parsedDate), tva: parseFloat(parsed.tva) || 0, devise: parsed.devise || profile.devise || "EUR", numTicket: parsed.numTicket || "", items: Array.isArray(parsed.items) && parsed.items.length > 0 ? parsed.items : ["Ticket scanné"], cardTheme: nextCardTheme(), confidence: 96, photo: photoB64 });
      setAiPhase(3);
    } catch (err) { setAiPhase(0); setAiResult(null); showToast("Scan échoué : " + (err.message || "Erreur")); }
    finally { clearTimeout(timeout); }
  };
  const confirmAi = () => { setTickets(prev => [{ id: Date.now(), ...aiResult, archived: false, unread: true }, ...prev]); setAiPhase(0); setAiResult(null); showToast("Ticket ajouté par IA"); };

  if (!onboardDone) {
    return (
      <>
        <style>{CSS}</style>
        <Onboarding onFinish={(data) => { setProfile(data); setOnboardDone(true); setTickets(INIT_TICKETS); }} />
      </>
    );
  }

  const HBtnStyle = { width: 34, height: 34, borderRadius: 17, border: "none", background: "rgba(255,255,255,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };

  return (
    <div style={{ width: "100%", height: "100dvh", background: theme.bg, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <style>{CSS}</style>

      {!isOnline && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 999, background: "rgba(220,38,38,0.95)", padding: "8px 18px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(8px)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span style={{ color: "white", fontSize: 12, fontFamily: "Outfit,sans-serif", fontWeight: 500 }}>Hors ligne — Scan IA indisponible</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", animation: viewAnim === "in" ? "viewIn 0.28s cubic-bezier(0.22,1,0.36,1) both" : "viewOut 0.15s ease-in both", pointerEvents: viewAnim === "out" ? "none" : "auto" }}>

        {view === "home" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 22px 0", flexShrink: 0 }}>
            <div>
              <p style={{ margin: 0, color: theme.accent + "99", fontSize: 10, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Outfit,sans-serif" }}>Bonjour {profile.name} 👋</p>
              <h1 style={{ margin: "4px 0 0", color: "white", fontSize: 28, fontWeight: 700, letterSpacing: -0.5, fontFamily: "Outfit,sans-serif" }}>{total} ticket{total !== 1 ? "s" : ""}</h1>
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 8 }}>
              {[{k:"date",l:"Date"},{k:"amount",l:"Montant"},{k:"label",l:"A-Z"}].map(s => (
                <button key={s.k} onClick={() => setSortBy(s.k)} style={{ height: 28, padding: "0 10px", borderRadius: 9, border: "none", cursor: "pointer", background: sortBy === s.k ? theme.accent + "33" : "rgba(255,255,255,0.07)", color: sortBy === s.k ? theme.accent : "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: sortBy === s.k ? 700 : 400, fontFamily: "Outfit,sans-serif", transition: "all 0.18s" }}>{s.l}</button>
              ))}
              <button className="hbtn" onClick={goSearch} style={HBtnStyle}><Icon type="search" size={17} /></button>
              <button className="hbtn" onClick={() => setAddSheet(true)} style={{ ...HBtnStyle, background: "linear-gradient(135deg," + theme.accent + "bb," + theme.accent + ")", boxShadow: "0 4px 14px " + theme.accent + "44" }}><Icon type="plus" size={17} color="#000" /></button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px 200px", position: "relative", overscrollBehavior: "contain" }}>
            {total === 0 ? <div style={{ textAlign: "center", paddingTop: 80, color: "rgba(255,255,255,0.15)" }}><Icon type="receipt" size={44} opacity={0.15} /><div style={{ fontFamily: "Outfit,sans-serif", fontSize: 13, marginTop: 14, lineHeight: 1.6 }}>Aucun ticket<br />Appuyez sur + pour en ajouter</div></div>
              : <div style={{ position: "relative", height: stackH, margin: "0 auto", maxWidth: 354 }}>
                  {activeTickets.map((ticket, i) => <TicketCard key={ticket.id} ticket={ticket} index={i} total={total} onClick={() => { setDetailT(ticket); setTickets(p => p.map(x => x.id === ticket.id ? { ...x, unread: false } : x)); }} onPhotoClick={setPhotoViewer} uiTheme={uiTheme} />)}
                </div>
            }
          </div>
          <div style={{ position: "absolute", bottom: 56, left: 0, right: 0, zIndex: 80, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "10px 18px 12px" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 9 }}>
              {PERIODS.map((p, i) => {
                const pc = new Date(); pc.setDate(pc.getDate() - p.days);
                const hasUnread = tickets.some(t => !t.archived && t.unread && parseDate(t.date) >= pc);
                return <button key={i} onClick={() => setPeriod(i)} style={{ flex: 1, height: 26, borderRadius: 9, border: "none", cursor: "pointer", background: period === i ? theme.accent + "33" : "rgba(255,255,255,0.05)", color: period === i ? theme.accent : "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: period === i ? 600 : 400, fontFamily: "Outfit,sans-serif", transition: "all 0.2s", position: "relative" }}>
                  {p.label}{hasUnread && <span style={{ position: "absolute", top: 3, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#ff3b30" }} />}
                </button>;
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, fontFamily: "Outfit,sans-serif" }}>{period === 4 ? "Tous les tickets" : "Sur " + PERIODS[period].label}</span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ textAlign: "center" }}><div style={{ color: "white", fontSize: 17, fontWeight: 500, fontFamily: "Outfit,sans-serif", lineHeight: 1 }}>{fmtMoney(periodStats.total, profile.devise || "EUR")}</div><div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Outfit,sans-serif", marginTop: 2 }}>dépensé</div></div>
                <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.08)" }} />
                <div style={{ textAlign: "center" }}><div style={{ color: "white", fontSize: 17, fontWeight: 500, fontFamily: "Outfit,sans-serif", lineHeight: 1 }}>{periodStats.count}</div><div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Outfit,sans-serif", marginTop: 2 }}>tickets</div></div>
              </div>
            </div>
          </div>
        </>}

        {view === "search" && <>
          <div style={{ padding: "16px 18px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "0 14px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Icon type="search" size={16} opacity={0.4} />
              <input ref={searchRef} value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Nom du ticket..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", padding: "13px 0" }} autoFocus />
              {searchQ && <button onClick={() => setSearchQ("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", opacity: 0.4 }}><Icon type="close" size={16} /></button>}
            </div>
            <button onClick={() => { changeView("home"); setSearchQ(""); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Outfit,sans-serif", cursor: "pointer", marginTop: 8, padding: 0 }}>Retour</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 80px", overscrollBehavior: "contain" }}>
            {!searchQ && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.18)", padding: "60px 0", fontSize: 13, fontFamily: "Outfit,sans-serif" }}>Tapez pour chercher</div>}
            {searchQ && searchResults.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.18)", padding: "60px 0", fontSize: 13, fontFamily: "Outfit,sans-serif" }}>Aucun résultat</div>}
            {searchResults.map((t, i) => {
              const ct = getCardTheme(uiTheme, t.cardTheme || 0);
              return <SwipeRow key={t.id} onDelete={() => deleteTicket(t.id)} onArchive={!t.archived ? () => { setArchivePick(t); } : null}>
                <div className="rrow" onClick={() => setDetailT(t)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 16, cursor: "pointer", animation: "rowSlide 0.3s cubic-bezier(0.22,1,0.36,1) " + (i * 0.04) + "s both", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: ct.grad, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }} />
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ color: "white", fontSize: 14, fontWeight: 500, fontFamily: "Outfit,sans-serif" }}>{t.label}</div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "Outfit,sans-serif", marginTop: 2 }}>{t.date}{t.archived && <span style={{ color: "rgba(255,200,100,0.6)", marginLeft: 8 }}>Archivé</span>}</div></div>
                  <span style={{ color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", flexShrink: 0 }}>{fmtMoney(t.amount, t.devise || "EUR")}</span>
                </div>
              </SwipeRow>;
            })}
          </div>
        </>}

        {view === "archive" && <>
          <div style={{ padding: "14px 22px 10px", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, color: theme.accent + "99", fontSize: 10, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Outfit,sans-serif" }}>Stockage</p>
                <h1 style={{ margin: "4px 0 0", color: "white", fontSize: 26, fontWeight: 800, fontFamily: "Outfit,sans-serif", letterSpacing: -0.5 }}>Archives</h1>
              </div>
              <button className="hbtn" onClick={() => { setFolderForm({ label: "", sub: "" }); setEditFolder(null); setFolderModal(true); }} style={{ ...HBtnStyle, background: "linear-gradient(135deg,#F5DC70," + YF.main + ")", width: 36, height: 36 }}><Icon type="plus" size={16} color={YF.text} /></button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "0 12px", border: "1px solid rgba(255,255,255,0.08)", marginTop: 10 }}>
              <Icon type="search" size={14} opacity={0.3} />
              <input value={archiveSearchQ} onChange={e => setArchiveSearchQ(e.target.value)} placeholder="Rechercher dans les archives..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: "white", fontSize: 12, fontFamily: "Outfit,sans-serif", padding: "10px 0" }} />
              {archiveSearchQ && <button onClick={() => setArchiveSearchQ("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, opacity: 0.4 }}><Icon type="close" size={14} /></button>}
            </div>
            {archivedTickets.length > 0 && <div style={{ marginTop: 8, padding: "6px 12px", background: "rgba(0,0,0,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "Outfit,sans-serif" }}>{archivedTickets.length} ticket{archivedTickets.length !== 1 ? "s" : ""} archivé{archivedTickets.length !== 1 ? "s" : ""} · {fmtMoney(archivedTickets.reduce((s, t) => s + t.amount, 0), profile.devise || "EUR")}</span></div>}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 80px", overscrollBehavior: "contain" }}>
            {archiveSearchQ.trim()
              ? (() => {
                  const q = archiveSearchQ.toLowerCase();
                  const results = archivedTickets.filter(t => t.label.toLowerCase().includes(q));
                  return results.length === 0
                    ? <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", padding: "50px 0", fontSize: 13, fontFamily: "Outfit,sans-serif" }}>Aucun résultat</div>
                    : results.map((t, i) => {
                        const ct = getCardTheme(uiTheme, t.cardTheme || 0);
                        return <div key={t.id} className="rrow" onClick={() => setDetailT(t)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 16, marginBottom: 4, cursor: "pointer", animation: "rowSlide 0.3s cubic-bezier(0.22,1,0.36,1) " + (i * 0.04) + "s both" }}>
                          <div style={{ width: 38, height: 38, borderRadius: 12, background: ct.grad, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }} />
                          <div style={{ flex: 1, minWidth: 0 }}><div style={{ color: "white", fontSize: 14, fontWeight: 500, fontFamily: "Outfit,sans-serif" }}>{t.label}</div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "Outfit,sans-serif", marginTop: 2 }}>{t.date} · {folders.find(f => f.id === t.archiveFolder)?.label || "—"}</div></div>
                          <span style={{ color: "white", fontSize: 13, fontFamily: "Outfit,sans-serif", flexShrink: 0 }}>{fmtMoney(t.amount, t.devise || "EUR")}</span>
                        </div>;
                      });
                })()
              : folders.length === 0
                ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 14 }}>
                    <svg viewBox="0 0 80 80" width="80" height="80" opacity="0.15"><rect x="8" y="22" width="64" height="48" rx="8" fill="none" stroke="white" strokeWidth="2"/><path d="M8 34h64" stroke="white" strokeWidth="2"/><rect x="20" y="12" width="12" height="12" rx="3" fill="none" stroke="white" strokeWidth="2"/></svg>
                    <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, fontFamily: "Outfit,sans-serif", textAlign: "center", lineHeight: 1.7 }}>Aucun dossier<br/><span style={{ fontSize: 12 }}>Appuyez sur + pour créer un dossier</span></div>
                  </div>
                : folders.map((f, i) => <ArchiveFolder key={f.id} folder={f} index={i} tickets={archivedTickets.filter(t => t.archiveFolder === f.id)} isOpen={archiveOpen === f.id} onToggle={() => setArchiveOpen(archiveOpen === f.id ? null : f.id)} onEdit={() => { setFolderForm({ label: f.label, sub: f.sub }); setEditFolder(f.id); setFolderModal(true); }} onDelete={() => deleteFolder(f.id)} onTicketClick={(t) => { setDetailT(t); setTickets(p => p.map(x => x.id === t.id ? { ...x, unread: false } : x)); }} uiTheme={uiTheme} />)
            }
          </div>
        </>}

        {view === "stats" && <>
          <div style={{ padding: "14px 22px 0", flexShrink: 0 }}>
            <p style={{ margin: 0, color: theme.accent + "99", fontSize: 10, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Outfit,sans-serif" }}>Analyse</p>
            <h1 style={{ margin: "4px 0 0", color: "white", fontSize: 28, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: -0.5 }}>Statistiques</h1>
          </div>
          <div style={{ display: "flex", gap: 6, padding: "12px 16px 0", flexShrink: 0 }}>
            {PERIODS.map((p, i) => <button key={i} onClick={() => setStatPeriod(i)} style={{ flex: 1, height: 28, borderRadius: 9, border: "none", cursor: "pointer", background: statPeriod === i ? theme.accent + "33" : "rgba(255,255,255,0.05)", color: statPeriod === i ? theme.accent : "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: statPeriod === i ? 600 : 400, fontFamily: "Outfit,sans-serif" }}>{p.label}</button>)}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 80px", overscrollBehavior: "contain" }}>
            {tickets.length === 0
              ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 14 }}>
                  <svg viewBox="0 0 80 80" width="80" height="80" opacity="0.15"><rect x="10" y="8" width="60" height="64" rx="8" fill="none" stroke="white" strokeWidth="2"/><line x1="22" y1="26" x2="58" y2="26" stroke="white" strokeWidth="2"/><line x1="22" y1="36" x2="50" y2="36" stroke="white" strokeWidth="2"/><line x1="22" y1="46" x2="44" y2="46" stroke="white" strokeWidth="2"/><line x1="22" y1="56" x2="58" y2="56" stroke="white" strokeWidth="2"/></svg>
                  <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, fontFamily: "Outfit,sans-serif", textAlign: "center", lineHeight: 1.7 }}>Pas encore de données<br/><span style={{ fontSize: 12 }}>Ajoutez des tickets pour voir vos stats</span></div>
                </div>
              : <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {[{ label: "Total", value: fmtMoney(statData.total, profile.devise || "EUR"), sub: PERIODS[statPeriod].label, color: theme.accent }, { label: "Tickets", value: statData.count, sub: "transactions", color: theme.accent }, { label: "Moyenne", value: statData.count > 0 ? fmtMoney(statData.total / statData.count, profile.devise || "EUR") : "---", sub: "par ticket", color: theme.accent }, { label: "Max", value: statData.biggest ? fmtMoney(statData.biggest.amount, statData.biggest.devise || "EUR") : "---", sub: statData.biggest?.label || "---", color: theme.accent }].map((k, i) => (
                      <div key={i} style={{ background: theme.card, borderRadius: 18, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Outfit,sans-serif", marginBottom: 6 }}>{k.label}</div>
                        <div style={{ color: "white", fontSize: 16, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: -0.3 }}>{k.value}</div>
                        <div style={{ color: k.color, fontSize: 9, fontFamily: "Outfit,sans-serif", marginTop: 3 }}>{k.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: theme.card, borderRadius: 18, padding: 16, border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14 }}>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Outfit,sans-serif", marginBottom: 12 }}>Dépenses</div>
                    <BarChart data={statData.bars} color={theme.accent} />
                  </div>
                  <div style={{ background: theme.card, borderRadius: 18, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Outfit,sans-serif", marginBottom: 12 }}>Derniers tickets</div>
                    {tickets.slice(0, 5).map((t, i) => { const ct = getCardTheme(uiTheme, t.cardTheme || 0); return <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}><div style={{ width: 24, height: 24, borderRadius: 7, background: ct.grad, flexShrink: 0 }} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ color: "white", fontSize: 12, fontFamily: "Outfit,sans-serif" }}>{t.label}</div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "Outfit,sans-serif" }}>{t.date}</div></div><span style={{ color: "white", fontSize: 12, fontFamily: "Outfit,sans-serif" }}>{fmtMoney(t.amount, t.devise || "EUR")}</span></div>; })}
                  </div>
                </>
            }
          </div>
        </>}


        {view === "settings" && <>
          <div style={{ padding: "14px 22px 10px", flexShrink: 0 }}>
            <p style={{ margin: 0, color: theme.accent + "99", fontSize: 10, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Outfit,sans-serif" }}>Compte</p>
            <h1 style={{ margin: "4px 0 0", color: "white", fontSize: 28, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: -0.5 }}>Réglages</h1>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 16px 100px", overscrollBehavior: "contain" }}>
            <div style={{ background: "linear-gradient(135deg," + theme.accent + "22," + theme.accent + "08)", border: "1px solid " + theme.accent + "30", borderRadius: 20, padding: "18px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: theme.accent + "25", border: "1.5px solid " + theme.accent + "50", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 22 }}>{profile.name ? profile.name[0].toUpperCase() : "?"}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {editNameMode
                  ? <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input value={editNameVal} onChange={e => setEditNameVal(e.target.value)} autoFocus style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid " + theme.accent + "50", borderRadius: 10, padding: "8px 10px", color: "white", fontSize: 15, fontFamily: "Outfit,sans-serif", outline: "none", fontWeight: 600 }} />
                      <button onClick={() => { setProfile(p => ({ ...p, name: editNameVal.trim() || "Vous" })); setEditNameMode(false); showToast("Prénom mis à jour"); }} style={{ width: 34, height: 34, borderRadius: 10, border: "none", background: theme.accent + "33", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon type="check" size={16} color={theme.accent} /></button>
                    </div>
                  : <>
                      <div style={{ color: "white", fontSize: 17, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: -0.3 }}>{profile.name}</div>
                      <div style={{ color: theme.accent + "99", fontSize: 11, fontFamily: "Outfit,sans-serif", marginTop: 2 }}>{tickets.length} ticket{tickets.length !== 1 ? "s" : ""} · {folders.length} dossier{folders.length !== 1 ? "s" : ""}</div>
                    </>
                }
              </div>
              {!editNameMode && <button onClick={() => { setEditNameVal(profile.name); setEditNameMode(true); }} style={{ width: 34, height: 34, borderRadius: 10, border: "none", background: "rgba(255,255,255,0.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon type="edit" size={15} opacity={0.5} /></button>}
            </div>

            <SSection title="Préférences">
              <div style={{ padding: "13px 16px" }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8, fontFamily: "Outfit,sans-serif" }}>Devise par défaut</div>
                <div style={{ display: "flex", gap: 7 }}>
                  {["EUR", "USD", "GBP", "CHF"].map(d => (
                    <button key={d} onClick={() => { setProfile(p => ({ ...p, devise: d })); showToast("Devise mise à jour"); }} style={{ flex: 1, height: 34, borderRadius: 9, border: "none", cursor: "pointer", background: profile.devise === d ? theme.accent + "33" : "rgba(255,255,255,0.06)", color: profile.devise === d ? theme.accent : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: profile.devise === d ? 700 : 400, fontFamily: "Outfit,sans-serif", transition: "all 0.18s", outline: profile.devise === d ? ("1px solid " + theme.accent + "60") : "none" }}>{d}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,59,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon type="bell" size={17} color="#ff3b30" /></div>
                  <div><div style={{ color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", fontWeight: 500 }}>Tickets non lus</div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "Outfit,sans-serif", marginTop: 1 }}>Point rouge sur les nouveaux</div></div>
                </div>
                <Toggle value={prefs.notifUnread} onChange={v => setPrefs(p => ({ ...p, notifUnread: v }))} accent={theme.accent} />
              </div>
            </SSection>



            <SSection title="Scan IA — Clé API Claude">
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: apiKey && apiKey.startsWith("sk-ant-") ? "#10B981" : "#ff3b30", flexShrink: 0, boxShadow: apiKey && apiKey.startsWith("sk-ant-") ? "0 0 6px #10B981" : "0 0 6px #ff3b30" }} />
                  <span style={{ color: apiKey && apiKey.startsWith("sk-ant-") ? "#10B981" : "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Outfit,sans-serif" }}>{apiKey && apiKey.startsWith("sk-ant-") ? "Clé configurée — Scan IA actif" : "Aucune clé — Scan IA désactivé"}</span>
                </div>
                {!showKeyInput
                  ? <button onClick={() => { setKeyDraft(apiKey); setShowKeyInput(true); }} style={{ width: "100%", height: 40, borderRadius: 12, border: "1px solid rgba(99,102,241,0.4)", background: "rgba(99,102,241,0.1)", color: "#818cf8", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>{apiKey ? "Modifier la clé API" : "Saisir ma clé API"}</button>
                  : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input value={keyDraft} onChange={e => setKeyDraft(e.target.value)} placeholder="sk-ant-api03-..." type="password" style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid rgba(99,102,241,0.4)", background: "rgba(99,102,241,0.08)", color: "white", fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }} />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { setApiKey(keyDraft.trim()); setShowKeyInput(false); showToast(keyDraft.trim() ? "Clé API enregistrée" : "Clé supprimée"); }} style={{ flex: 1, height: 38, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Enregistrer</button>
                        <button onClick={() => setShowKeyInput(false)} style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "rgba(255,255,255,0.4)", fontSize: 18, cursor: "pointer" }}>✕</button>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "Outfit,sans-serif", lineHeight: 1.5 }}>Stockée uniquement sur cet appareil. Obtenez-la sur console.anthropic.com</div>
                      {apiKey && <button onClick={() => { setApiKey(""); setKeyDraft(""); setShowKeyInput(false); showToast("Clé supprimée"); }} style={{ background: "none", border: "none", color: "rgba(255,59,48,0.6)", fontSize: 11, cursor: "pointer", fontFamily: "Outfit,sans-serif", textAlign: "left", padding: 0 }}>Supprimer la clé</button>}
                    </div>
                }
              </div>
            </SSection>

            <SSection title="Données">
              <SRow icon="download" label="Exporter tout en CSV" sub={tickets.length + " tickets"} onClick={exportAllCSV} iconBg="rgba(16,185,129,0.15)" />
              <SRow icon="trash" label="Réinitialiser l'application" sub="Tickets, préférences, retour à l'accueil" onClick={() => setConfirmReset(true)} iconBg="rgba(255,59,48,0.12)" danger />
            </SSection>

            <SSection title="À propos">
              <SRow icon="info"   label="Version"              right="1.3.0"    iconBg="rgba(255,255,255,0.06)" noChevron />
              <SRow icon="shield" label="Données locales"      right="Privé"    iconBg="rgba(16,185,129,0.1)"   noChevron sub="Aucune donnée envoyée en ligne" />
              <SRow icon="globe"  label="Langue"               right="Français" iconBg="rgba(255,255,255,0.06)" noChevron />
              <SRow icon="info"   label="Politique de confidentialité" onClick={() => setShowPrivacy(true)} iconBg="rgba(99,102,241,0.12)" />
            </SSection>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 0 8px" }}>
              <img src={TIKIT_LOGO} alt="tikit" style={{ width: 72, height: 72, objectFit: "contain" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: 2 }}>tikit</div>
                <div style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, fontFamily: "Outfit,sans-serif", marginTop: 2 }}>Votre portefeuille de tickets</div>
              </div>
            </div>
          </div>
        </>}

      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(10,10,10,0.97)", zIndex: 90, backdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center" }}>
          {[{ tab: "home", icon: "home", label: "Wallet", badge: prefs.notifUnread ? unreadCount : 0 }, { tab: "stats", icon: "stats", label: "Stats", badge: 0 }, { tab: "archive", icon: "archive", label: "Archives", badge: 0 }, { tab: "settings", icon: "settings", label: "Réglages", badge: 0 }].map(({ tab, icon, label, badge }) => (
            <button key={tab} className="nav-btn" onClick={() => { setActiveTab(tab); changeView(tab); }} style={{ flex: 1, border: "none", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, paddingBottom: 4, position: "relative" }}>
              <div style={{ position: "relative" }}>
                <Icon type={icon} size={20} color={activeTab === tab ? "white" : "rgba(255,255,255,0.3)"} />
                {badge > 0 && <div style={{ position: "absolute", top: -4, right: -6, minWidth: 16, height: 16, borderRadius: 8, background: "#ff3b30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontFamily: "Outfit,sans-serif", color: "white", fontWeight: 700, padding: "0 3px" }}>{badge}</div>}
              </div>
              <span style={{ color: activeTab === tab ? "white" : "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "Outfit,sans-serif", letterSpacing: 0.5, fontWeight: activeTab === tab ? 600 : 400 }}>{label}</span>
              {activeTab === tab && <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 16, height: 2, borderRadius: 1, background: theme.accent }} />}
            </button>
          ))}
        </div>
      </div>

      {addSheet && !addMode && (
        <div style={{ position: "absolute", inset: 0, zIndex: 180, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => setAddSheet(false)}>
          <div style={{ width: "100%", background: "#111114", borderRadius: "28px 28px 0 0", padding: "0 18px 48px", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "12px auto 22px" }} />
            <div style={{ color: "white", fontSize: 18, fontWeight: 700, fontFamily: "Outfit,sans-serif", marginBottom: 6 }}>Ajouter un ticket</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "Outfit,sans-serif", marginBottom: 22 }}>Comment souhaitez-vous ajouter ce ticket ?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="abtn" onClick={() => setAddMode("manual")} style={{ height: 56, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "Outfit,sans-serif" }}><Icon type="plus" size={18} /> Saisie manuelle</button>
              <button className="abtn" onClick={apiKey && apiKey.startsWith("sk-ant-") && isOnline ? triggerAiScan : () => { setAddSheet(false); if (!isOnline) { showToast("Hors ligne — Scan IA indisponible"); return; } changeView("settings"); setActiveTab("settings"); showToast("Configurez votre clé API dans Réglages"); }} style={{ height: 56, borderRadius: 16, border: "none", background: apiKey && apiKey.startsWith("sk-ant-") && isOnline ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.06)", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "Outfit,sans-serif", boxShadow: apiKey && apiKey.startsWith("sk-ant-") && isOnline ? "0 4px 18px rgba(99,102,241,0.35)" : "none" }}>
                <Icon type="ai" size={18} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span>Scan IA</span>
                  <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 400 }}>{!isOnline ? "Hors ligne" : apiKey && apiKey.startsWith("sk-ant-") ? "Claude Vision" : "Clé API requise"}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {addSheet && addMode === "manual" && (
        <div style={{ position: "absolute", inset: 0, zIndex: 180, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => { setAddMode(null); setAddSheet(false); }}>
          <div style={{ width: "100%", maxHeight: "82%", background: "#111114", borderRadius: "28px 28px 0 0", padding: "0 18px 44px", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)", display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "12px auto 18px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <button onClick={() => setAddMode(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, opacity: 0.5 }}><Icon type="close" size={18} /></button>
              <div style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "Outfit,sans-serif" }}>Nouveau ticket</div>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {[{ k: "label", l: "Libellé *", ph: "Ex : Carrefour", mode: undefined }, { k: "amount", l: "Montant *", ph: "Ex : 42.50", mode: "decimal" }, { k: "items", l: "Articles (séparés par virgule)", ph: "Pain, Fromage, Yaourt...", mode: undefined }].map(({ k, l, ph, mode }) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>{l}</div>
                  <input value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} inputMode={mode} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>Date</div>
                <input type="date" value={form.date} max={new Date().toISOString().slice(0, 10)} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", outline: "none", boxSizing: "border-box", colorScheme: "dark" }} />
              </div>
              <button onClick={submitManual} style={{ width: "100%", height: 50, borderRadius: 16, border: "none", background: "linear-gradient(135deg," + theme.accent + "cc," + theme.accent + ")", color: "#000", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit,sans-serif", marginTop: 6 }}>Ajouter le ticket</button>
            </div>
          </div>
        </div>
      )}

      {detailT && (() => {
        const ct = getCardTheme(uiTheme, detailT.cardTheme || 0);
        const textColor = ct.light ? "rgba(10,5,0,0.9)" : "rgba(255,255,255,0.95)";
        const subColor = ct.light ? "rgba(10,5,0,0.5)" : "rgba(255,255,255,0.45)";
        return (
          <div style={{ position: "absolute", inset: 0, zIndex: 160, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => setDetailT(null)}>
            <div style={{ width: "100%", background: "#111114", borderRadius: "28px 28px 0 0", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
              <div className="receipt-shape-both" style={{ background: ct.grad, padding: "20px 22px 18px", border: "1px solid " + (ct.light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)") }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ color: subColor, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>#{String(detailT.id).slice(-6).padStart(6, "0")}</div>
                    <div style={{ color: textColor, fontSize: 22, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: -0.5 }}>{detailT.label}</div>
                    <div style={{ color: subColor, fontSize: 11, fontFamily: "'Courier Prime',monospace", marginTop: 3 }}>{detailT.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: subColor, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>Total</div>
                    <div style={{ color: ct.accent, fontSize: 24, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: -1 }}>{fmtMoney(detailT.amount, detailT.devise || "EUR")}</div>
                  </div>
                </div>
                <div style={{ borderTop: "1px dashed " + subColor, margin: "8px 0", opacity: 0.4 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <Barcode color={ct.light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} opacity={1} />
                  <div style={{ color: subColor, fontSize: 7, fontFamily: "'Space Mono',monospace", letterSpacing: 0.5 }}>TXN-{String(detailT.id).padStart(9, "0")}</div>
                </div>
              </div>
              <div style={{ padding: "16px 18px 0", maxHeight: "55vh", overflowY: "auto" }}>
                {detailT.photo && <div style={{ marginBottom: 14, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", cursor: "zoom-in" }} onClick={() => setPhotoViewer(detailT.photo)}><img src={detailT.photo} alt="Ticket" style={{ width: "100%", maxHeight: 220, objectFit: "cover", display: "block" }} /></div>}
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "4px 0", marginBottom: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
                  {[{ k: "Enseigne", v: detailT.label }, { k: "Date", v: detailT.date }, { k: "Total", v: fmtMoney(detailT.amount, detailT.devise || "EUR") }, { k: "N° ticket", v: detailT.numTicket || "—" }, { k: "TVA", v: detailT.tva > 0 ? fmtMoney(detailT.tva, detailT.devise || "EUR") : "—" }, { k: "Devise", v: detailT.devise || "EUR" }].map(({ k, v }, i, arr) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "Outfit,sans-serif" }}>{k}</span>
                      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "'Courier Prime',monospace", fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                {detailT.items && detailT.items.length > 0 && <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, overflow: "hidden", marginBottom: 14 }}><div style={{ padding: "8px 14px 4px", color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Space Mono',monospace" }}>Articles</div>{detailT.items.map((item, i) => <div key={i} style={{ padding: "9px 14px", borderBottom: i < detailT.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "'Courier Prime',monospace" }}>{item}</div>)}</div>}
                {detailT.archived && <div style={{ background: "rgba(255,200,80,0.08)", borderRadius: 10, padding: "8px 14px", marginBottom: 14, border: "1px solid rgba(255,200,80,0.15)" }}><span style={{ color: "rgba(255,200,80,0.7)", fontSize: 11, fontFamily: "Outfit,sans-serif" }}>Archivé dans {folders.find(f => f.id === detailT.archiveFolder)?.label || "un dossier"}</span></div>}
                <div style={{ display: "flex", gap: 8, paddingBottom: 40 }}>
                  {!detailT.archived
                    ? <button className="abtn" onClick={() => { setArchivePick(detailT); setDetailT(null); }} style={{ flex: 1, height: 48, borderRadius: 14, border: "none", background: "linear-gradient(135deg," + YF.main + ",#E8C85A)", color: "#0A0A00", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "Outfit,sans-serif" }}><Icon type="archive" size={15} color="#0A0A00" /> Archiver</button>
                    : <button className="abtn" onClick={() => unarchiveTicket(detailT.id)} style={{ flex: 1, height: 48, borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "Outfit,sans-serif" }}><Icon type="inbox" size={15} /> Remettre dans le wallet</button>
                  }
                  <button className="abtn" onClick={() => exportTicketPDF(detailT)} title="Exporter en PDF" style={{ width: 48, height: 48, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon type="download" size={16} /></button>
                  <button className="abtn" onClick={() => { setEditTicket(detailT.id); setEditForm({ label: detailT.label, amount: String(detailT.amount), date: "", items: (detailT.items || []).join(", ") }); }} style={{ width: 48, height: 48, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon type="edit" size={16} /></button>
                  <button className="abtn" onClick={() => deleteTicket(detailT.id)} style={{ width: 48, height: 48, borderRadius: 14, border: "none", background: "rgba(255,59,48,0.1)", color: "#ff3b30", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon type="trash" size={16} color="#ff3b30" /></button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {editTicket && (
        <div style={{ position: "absolute", inset: 0, zIndex: 220, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => setEditTicket(null)}>
          <div style={{ width: "100%", maxHeight: "80%", background: "#111114", borderRadius: "28px 28px 0 0", padding: "0 18px 44px", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)", display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "12px auto 18px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <button onClick={() => setEditTicket(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, opacity: 0.5 }}><Icon type="close" size={18} /></button>
              <div style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "Outfit,sans-serif" }}>Modifier le ticket</div>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {[{ k: "label", l: "Libellé *", ph: "Ex : Carrefour" }, { k: "amount", l: "Montant *", ph: "Ex : 42.50" }, { k: "items", l: "Articles (séparés par virgule)", ph: "Pain, Fromage..." }].map(({ k, l, ph }) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>{l}</div>
                  <input value={editForm[k]} onChange={e => setEditForm(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} inputMode={k === "amount" ? "decimal" : undefined} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>Nouvelle date (laisser vide pour garder)</div>
                <input type="date" value={editForm.date} max={new Date().toISOString().slice(0, 10)} onChange={e => setEditForm(p => ({ ...p, date: e.target.value }))} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", outline: "none", boxSizing: "border-box", colorScheme: "dark" }} />
              </div>
              <button onClick={updateTicket} style={{ width: "100%", height: 50, borderRadius: 16, border: "none", background: "linear-gradient(135deg," + theme.accent + "cc," + theme.accent + ")", color: "#000", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit,sans-serif", marginTop: 6 }}>Enregistrer les modifications</button>
            </div>
          </div>
        </div>
      )}

      {archivePick && (
        <div style={{ position: "absolute", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.72)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => setArchivePick(null)}>
          <div style={{ width: "100%", background: "#111114", borderRadius: "28px 28px 0 0", padding: "0 18px 48px", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "12px auto 20px" }} />
            <div style={{ color: "white", fontSize: 17, fontWeight: 700, fontFamily: "Outfit,sans-serif", marginBottom: 4 }}>Archiver le ticket</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "Outfit,sans-serif", marginBottom: 18 }}>Choisir un dossier pour {archivePick?.label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {folders.map(f => <button key={f.id} className="abtn" onClick={() => archiveTicket(archivePick.id, f.id)} style={{ height: 52, borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", fontFamily: "Outfit,sans-serif" }}><div style={{ width: 10, height: 10, borderRadius: 3, background: f.color, flexShrink: 0 }} /><span style={{ flex: 1 }}>{f.label}</span><span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>{archivedTickets.filter(t => t.archiveFolder === f.id).length} tickets</span></button>)}
              {folders.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", padding: "16px 0", fontSize: 12, fontFamily: "Outfit,sans-serif" }}>Aucun dossier — créez-en un dans les Archives</div>}
            </div>
          </div>
        </div>
      )}

      {folderModal && (
        <div style={{ position: "absolute", inset: 0, zIndex: 210, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => setFolderModal(false)}>
          <div style={{ width: "100%", background: "#111114", borderRadius: "28px 28px 0 0", padding: "0 18px 44px", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "12px auto 18px" }} />
            <div style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "Outfit,sans-serif", marginBottom: 18 }}>{editFolder ? "Modifier le dossier" : "Nouveau dossier"}</div>
            {[{ key: "label", label: "Nom *", ph: "Ex : Dépenses du mois" }, { key: "sub", label: "Description", ph: "Ex : Tickets du quotidien" }].map(({ key, label, ph }) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontFamily: "Outfit,sans-serif" }}>{label}</div>
                <input value={folderForm[key]} onChange={e => setFolderForm(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontFamily: "Outfit,sans-serif", outline: "none" }} />
              </div>
            ))}
            <button onClick={saveFolder} style={{ width: "100%", height: 50, borderRadius: 16, border: "none", background: "linear-gradient(135deg,#F5DC70," + YF.main + ")", color: YF.text, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8, fontFamily: "Outfit,sans-serif" }}>{editFolder ? "Enregistrer" : "Créer le dossier"}</button>
          </div>
        </div>
      )}

      {confirmReset && (
        <div style={{ position: "absolute", inset: 0, zIndex: 250, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }}>
          <div style={{ background: "#111114", borderRadius: 24, padding: "28px 22px", width: "100%", maxWidth: 320, border: "1px solid rgba(255,59,48,0.2)", animation: "slideUp 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,59,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Icon type="trash" size={24} color="#ff3b30" /></div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 700, fontFamily: "Outfit,sans-serif", textAlign: "center", marginBottom: 8 }}>Réinitialiser l'app ?</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontFamily: "Outfit,sans-serif", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>Tous vos tickets, dossiers et préférences seront supprimés. Vous reviendrez à l'écran d'accueil.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmReset(false)} style={{ flex: 1, height: 46, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "white", fontSize: 14, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Annuler</button>
              <button onClick={() => { setTickets([]); setFolders(INIT_FOLDERS); setProfile({ name: "Vous", devise: "EUR" }); setApiKey(""); setUiTheme("classic"); setOnboardDone(false); setConfirmReset(false); }} style={{ flex: 1, height: 46, borderRadius: 14, border: "none", background: "#ff3b30", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Réinitialiser</button>
            </div>
          </div>
        </div>
      )}

      {aiPhase > 0 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 220, background: "rgba(0,0,0,0.96)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
          {(aiPhase === 1 || aiPhase === 2) && <>
            <div style={{ width: 200, height: 260, borderRadius: 20, border: "1.5px solid rgba(99,102,241,0.5)", position: "relative", overflow: "hidden", background: "rgba(99,102,241,0.04)", marginBottom: 28 }}>
              <div style={{ position: "absolute", left: 10, top: 10, width: 22, height: 22, borderTop: "2px solid #6366f1", borderLeft: "2px solid #6366f1" }} />
              <div style={{ position: "absolute", right: 10, top: 10, width: 22, height: 22, borderTop: "2px solid #6366f1", borderRight: "2px solid #6366f1" }} />
              <div style={{ position: "absolute", left: 10, bottom: 10, width: 22, height: 22, borderBottom: "2px solid #6366f1", borderLeft: "2px solid #6366f1" }} />
              <div style={{ position: "absolute", right: 10, bottom: 10, width: 22, height: 22, borderBottom: "2px solid #6366f1", borderRight: "2px solid #6366f1" }} />
              <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#6366f1,transparent)", animation: "scanMove 1.8s ease-in-out infinite", boxShadow: "0 0 14px #6366f1" }} />
              {aiPhase === 2 && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(99,102,241,0.08)" }}><div style={{ color: "#6366f1", fontSize: 12, fontFamily: "Outfit,sans-serif", animation: "pulse 1s infinite", textAlign: "center", lineHeight: 1.8 }}>Lecture du ticket...<br />Extraction des données...</div></div>}
            </div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 500, fontFamily: "Outfit,sans-serif", marginBottom: 10 }}>{aiPhase === 1 ? "Scan en cours..." : "Reconnaissance IA..."}</div>
            {aiPhase === 1 && <div style={{ width: 180, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}><div style={{ width: scanPct + "%", height: "100%", background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: 2, transition: "width 0.06s" }} /></div>}
            <button onClick={() => { setAiPhase(0); setAiResult(null); }} style={{ marginTop: 24, background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 20px", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Annuler</button>
          </>}
          {aiPhase === 3 && aiResult && (() => {
            const ct = getCardTheme(uiTheme, aiResult.cardTheme || 0);
            return <>
              <div style={{ width: "100%", borderRadius: 20, overflow: "hidden", marginBottom: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                <div style={{ height: 80, background: ct.grad, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: ct.light ? "rgba(10,5,0,0.9)" : "white", fontSize: 18, fontWeight: 700, fontFamily: "Outfit,sans-serif" }}>{aiResult.label}</div>
                  <div style={{ color: ct.accent, fontSize: 20, fontWeight: 700, fontFamily: "'Space Mono',monospace" }}>{fmtMoney(aiResult.amount, aiResult.devise || "EUR")}</div>
                </div>
                <div style={{ background: "#111114", padding: "12px 20px" }}>
                  <div style={{ color: "#6366f1", fontSize: 11, fontFamily: "Outfit,sans-serif", marginBottom: 4 }}>Confiance IA : {aiResult.confidence}%</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "'Courier Prime',monospace" }}>{aiResult.date}</div>
                </div>
              </div>
              <button onClick={confirmAi} style={{ width: "100%", height: 50, borderRadius: 16, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit,sans-serif", marginBottom: 10 }}>Ajouter ce ticket</button>
              <button onClick={() => { setAiPhase(0); setAiResult(null); }} style={{ width: "100%", height: 44, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer", fontFamily: "Outfit,sans-serif" }}>Annuler</button>
            </>;
          })()}
        </div>
      )}

      {photoViewer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s" }} onClick={() => setPhotoViewer(null)}>
          <img src={photoViewer} alt="Ticket" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 12, objectFit: "contain", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }} />
          <div style={{ position: "absolute", top: 24, right: 24, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div style={{ position: "absolute", inset: 0, zIndex: 260, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "flex-end", backdropFilter: "blur(8px)", animation: "fadeIn 0.2s" }} onClick={() => setShowPrivacy(false)}>
          <div style={{ width: "100%", maxHeight: "88%", background: "#111114", borderRadius: "28px 28px 0 0", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.08)", animation: "slideUp 0.42s cubic-bezier(0.22,1,0.36,1)" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 20px 0", flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "0 auto 16px" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ color: "white", fontSize: 18, fontWeight: 700, fontFamily: "Outfit,sans-serif" }}>Politique de confidentialité</div>
                <button onClick={() => setShowPrivacy(false)} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4 }}><Icon type="close" size={18} /></button>
              </div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "Outfit,sans-serif", marginBottom: 16 }}>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</div>
            </div>
            <div style={{ overflowY: "auto", padding: "0 20px 48px", flex: 1 }}>
              {[
                { title: "1. Collecte des données", body: "tikit ne collecte aucune donnée personnelle. Toutes les informations que vous saisissez (tickets, montants, articles) sont stockées exclusivement sur votre appareil via le stockage local du navigateur (localStorage). Aucune donnée n'est transmise à nos serveurs." },
                { title: "2. Clé API Claude", body: "Si vous utilisez la fonctionnalité Scan IA, votre clé API Anthropic est stockée localement sur votre appareil. Lors d'un scan, une image est envoyée directement aux serveurs d'Anthropic selon leur propre politique de confidentialité (anthropic.com/privacy). tikit ne stocke jamais vos images." },
                { title: "3. Données de photos", body: "Les photos prises lors d'un scan sont traitées localement et une miniature peut être stockée dans l'application uniquement pour affichage. Ces données restent sur votre appareil et ne sont jamais partagées." },
                { title: "4. Partage de données", body: "tikit ne vend, ne loue et ne partage aucune donnée avec des tiers. Aucun outil d'analyse, de suivi ou de publicité n'est intégré dans l'application." },
                { title: "5. Sécurité", body: "Les données sont protégées par le mécanisme de sandboxing de votre navigateur. Nous vous recommandons de ne pas stocker votre clé API sur un appareil partagé. Vous pouvez supprimer toutes vos données à tout moment via Réglages → Réinitialiser l'application." },
                { title: "6. Droits des utilisateurs", body: "Vous avez un contrôle total sur vos données. Vous pouvez les consulter, les exporter (CSV) ou les supprimer définitivement à tout moment depuis les Réglages. Aucune procédure de demande n'est nécessaire car les données ne quittent jamais votre appareil." },
                { title: "7. Contact", body: "Pour toute question relative à cette politique de confidentialité, contactez-nous via les informations disponibles sur la page de l'application dans l'App Store." },
              ].map(({ title, body }) => (
                <div key={title} style={{ marginBottom: 20 }}>
                  <div style={{ color: "white", fontSize: 13, fontWeight: 700, fontFamily: "Outfit,sans-serif", marginBottom: 6 }}>{title}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Outfit,sans-serif", lineHeight: 1.7 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: "absolute", top: 70, left: 16, right: 16, zIndex: 270, background: "#1c1c1e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "13px 18px", color: "rgba(255,255,255,0.85)", fontSize: 13, fontFamily: "Outfit,sans-serif", textAlign: "center", animation: "toastIn 0.3s ease", boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}>{toast}</div>}
      <input ref={fileRef} type="file" hidden onChange={onFile} accept="image/*,application/pdf" />
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Courier+Prime:wght@400;700&display=swap');
  @keyframes slideUp  { from { transform: translateY(100%); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  @keyframes fadeIn   { from { opacity: 0 } to { opacity: 1 } }
  @keyframes toastIn  { from { transform: translateY(-14px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  @keyframes scanMove { 0% { top: 4% } 50% { top: 90% } 100% { top: 4% } }
  @keyframes pulse    { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
  @keyframes viewIn   { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes viewOut  { from { opacity: 1; transform: translateY(0) } to { opacity: 0; transform: translateY(-8px) } }
  @keyframes rowSlide { from { opacity: 0; transform: translateX(-8px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes obIn     { from { opacity: 0; transform: translateX(40px) scale(0.95) } to { opacity: 1; transform: translateX(0) scale(1) } }
  @keyframes obOut    { from { opacity: 1; transform: translateX(0) } to { opacity: 0; transform: translateX(-30px) } }
  @keyframes obFadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
  .receipt-shape-both { clip-path: polygon(0% 2.5%,1% 0%,2% 2.5%,3% 0%,4% 2.5%,5% 0%,6% 2.5%,7% 0%,8% 2.5%,9% 0%,10% 2.5%,11% 0%,12% 2.5%,13% 0%,14% 2.5%,15% 0%,16% 2.5%,17% 0%,18% 2.5%,19% 0%,20% 2.5%,21% 0%,22% 2.5%,23% 0%,24% 2.5%,25% 0%,26% 2.5%,27% 0%,28% 2.5%,29% 0%,30% 2.5%,31% 0%,32% 2.5%,33% 0%,34% 2.5%,35% 0%,36% 2.5%,37% 0%,38% 2.5%,39% 0%,40% 2.5%,41% 0%,42% 2.5%,43% 0%,44% 2.5%,45% 0%,46% 2.5%,47% 0%,48% 2.5%,49% 0%,50% 2.5%,51% 0%,52% 2.5%,53% 0%,54% 2.5%,55% 0%,56% 2.5%,57% 0%,58% 2.5%,59% 0%,60% 2.5%,61% 0%,62% 2.5%,63% 0%,64% 2.5%,65% 0%,66% 2.5%,67% 0%,68% 2.5%,69% 0%,70% 2.5%,71% 0%,72% 2.5%,73% 0%,74% 2.5%,75% 0%,76% 2.5%,77% 0%,78% 2.5%,79% 0%,80% 2.5%,81% 0%,82% 2.5%,83% 0%,84% 2.5%,85% 0%,86% 2.5%,87% 0%,88% 2.5%,89% 0%,90% 2.5%,91% 0%,92% 2.5%,93% 0%,94% 2.5%,95% 0%,96% 2.5%,97% 0%,98% 2.5%,99% 0%,100% 2.5%,100% 97.5%,99% 100%,98% 97.5%,97% 100%,96% 97.5%,95% 100%,94% 97.5%,93% 100%,92% 97.5%,91% 100%,90% 97.5%,89% 100%,88% 97.5%,87% 100%,86% 97.5%,85% 100%,84% 97.5%,83% 100%,82% 97.5%,81% 100%,80% 97.5%,79% 100%,78% 97.5%,77% 100%,76% 97.5%,75% 100%,74% 97.5%,73% 100%,72% 97.5%,71% 100%,70% 97.5%,69% 100%,68% 97.5%,67% 100%,66% 97.5%,65% 100%,64% 97.5%,63% 100%,62% 97.5%,61% 100%,60% 97.5%,59% 100%,58% 97.5%,57% 100%,56% 97.5%,55% 100%,54% 97.5%,53% 100%,52% 97.5%,51% 100%,50% 97.5%,49% 100%,48% 97.5%,47% 100%,46% 97.5%,45% 100%,44% 97.5%,43% 100%,42% 97.5%,41% 100%,40% 97.5%,39% 100%,38% 97.5%,37% 100%,36% 97.5%,35% 100%,34% 97.5%,33% 100%,32% 97.5%,31% 100%,30% 97.5%,29% 100%,28% 97.5%,27% 100%,26% 97.5%,25% 100%,24% 97.5%,23% 100%,22% 97.5%,21% 100%,20% 97.5%,19% 100%,18% 97.5%,17% 100%,16% 97.5%,15% 100%,14% 97.5%,13% 100%,12% 97.5%,11% 100%,10% 97.5%,9% 100%,8% 97.5%,7% 100%,6% 97.5%,5% 100%,4% 97.5%,3% 100%,2% 97.5%,1% 100%,0% 97.5%); }
  .wcard-wrapper:hover  { transform: translateY(-6px) !important }
  .wcard-wrapper:active { transform: scale(0.975) !important }
  .acard { transition: filter 0.15s }
  .acard:hover  { filter: brightness(1.05) !important }
  .acard:active { transform: scale(0.99) !important }
  .rrow { transition: background 0.15s, transform 0.12s }
  .rrow:hover  { background: rgba(255,255,255,0.06) !important; transform: translateX(3px) }
  .rrow:active { transform: scale(0.99) }
  .srow { transition: background 0.15s }
  .srow:hover  { background: rgba(255,255,255,0.04) }
  .srow:active { background: rgba(255,255,255,0.07) }
  .abtn, .hbtn { transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), filter 0.12s }
  .abtn:hover, .hbtn:hover  { transform: scale(1.06); filter: brightness(1.08) }
  .abtn:active, .hbtn:active { transform: scale(0.94) }
  .nav-btn { transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1) }
  .nav-btn:active { transform: scale(0.88) }
  ::-webkit-scrollbar { display: none }
  * { box-sizing: border-box; -webkit-font-smoothing: antialiased }
  html, body { overflow: hidden; position: fixed; width: 100%; height: 100% }
  input::placeholder { color: rgba(255,255,255,0.22) }
`;
