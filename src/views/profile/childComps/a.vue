<template>
  <div class="profile">
      <profile-navbar @titleClick="titleClick" ref="nav"/>
      <Scroll class="center" 
      ref="scroll" :probe-type="3"
      @scroll="contentScrolls">
          <ul ref="a1">
              <li>a1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
              <li>12a</li>
              <li>13</li>
              <li>14</li>
              <li>15</li>
              <li>16</li>
              <li>17</li>
              <li>18</li>
              <li>19</li>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
              <li>32</li>
              <li>33</li>
              <li>34</li>
              <li>35</li>
              <li>36</li>
              <li>37</li>
              <li>38</li>
              <li>39</li>
              <li>40</li>
          </ul>
          <ul ref="b1">
              <li>b1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
              <li>12b</li>
              <li>13</li>
              <li>14</li>
              <li>15</li>
              <li>16</li>
              <li>17</li>
              <li>18</li>
              <li>19</li>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
              <li>32</li>
              <li>33</li>
              <li>34</li>
              <li>35</li>
              <li>36</li>
              <li>37</li>
              <li>38</li>
              <li>39</li>
              <li>40</li>
          </ul>
          <ul ref="c1">
              <li>c1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
              <li>12c</li>
              <li>13</li>
              <li>14</li>
              <li>15</li>
              <li>16</li>
              <li>17</li>
              <li>18</li>
              <li>19</li>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
              <li>32</li>
              <li>33</li>
              <li>34</li>
              <li>35</li>
              <li>36</li>
              <li>37</li>
              <li>38</li>
              <li>39</li>
              <li>40</li>
          </ul>
      </Scroll>
  </div>
</template>

<script>
import ProfileNavbar from './childComps/ProfileNavbar.vue'
import Scroll from "components/common/scroll/Scroll";

export default {
name:"profile",
  components: { Scroll,ProfileNavbar },
  data(){
      return{
          tops:[],
          gettopY:null,
          currentIndex:0
      }
  },
  mounted(){
      this.$nextTick(() => {
          this.tops = []
          this.tops.push(0);
          this.tops.push(this.$refs.a1.offsetTop)
          this.tops.push(this.$refs.b1.offsetTop)
          this.tops.push(this.$refs.c1.offsetTop)
          this.tops.push(Number.MAX_VALUE)
      })
  },
  methods:{
      titleClick(index){
          this.$refs.scroll.scrollTo(0, -this.tops[index], 200)
      },
      contentScrolls(position){
        //   console.log(position);
          const positionY = -position.y
         let length = this.tops.length
        for(let i = 0; i < length-1; i++ ){
            if(this.currentIndex !== i &&(positionY >= this.tops[i] && 
            positionY < this.tops[i+1])) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }

}

  },


}
</script>

<style scoped>
.profile{
    height: 100vh;
    /* position: relative; */
}
    .center{
        height: calc(100% - 49px - 43px);
        overflow: hidden;
    }
</style>