<template>
   <div class="layout-wrapper">
       <slot></slot>
        <Layout class="layout-outer">
            <Sider breakpoint="md" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="sider-wrapper">
                    <Menu theme="dark"  ref="menu" :active-name="$route.name" :open-names="openNames" width="auto" @on-select="handleSelect">
                        <side-menu :parents="routers" />
                    </Menu>
            </Sider>
            <Layout>
                <Header class="header-wrapper"> 
                    <!-- <Icon :class="triggerClassess" @click.native="handleCollapsed" type="md-menu" :size="32"/> -->
                    <Button @click="handleLogout">退出登录</Button>
                    <Button @click="turnTo">打开参数页</Button>
                </Header>
                <Content class="content-wrapper">
                    <div id="tabs">
                        <Tabs type="card" @on-click="handleClickTab" :animated="false" :value="getTabNameByRoute($route)">
                            <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item,index) in tabs" :key="`tabNav${index}`"  />
                        </Tabs>
                    </div>
                    <Card dis-hover class="page-card">
                        <router-view/>
                    </Card>
                </Content>
            </Layout>            
        </Layout>
   </div>
</template>

<script>
import sideMenu from '../components/side-menu.vue'
import Table from './table.vue'
import {mapState,mapActions,mapMutations } from 'vuex'
import {getTabNameByRoute,getRouteById,getOpenArrByName} from '@/lib/util.js'
export default {
  components: { sideMenu, Table },
    name: 'LayOut',
    data(){
        return{
            isCollapsed: false,
            getTabNameByRoute
        }
    },
    mounted(){
        // console.log(this.$router)
        // this.UPDATE_ROUTER(this.$router)
    },

    watch: {
        // '$route' (newRoute) {
        //     // console.log(newRoute)
        //     this.UPDATE_ROUTER(newRoute)
        // },
        openNames (){
            this.$nextTick(()=>{
                this.$refs.menu.updateOpened()
            })
        }
    },

    computed:{
        ...mapState({
            routers: state => state.router.routers.filter(item=>{
                return item.path !== '*' && item.name !== 'login'
            }),
            tabs: state => state.tabNav.tabs
        }),
        // triggerClassess(){
        //     return [
        //         'icon-collapsed',
        //         this.isCollapsed ? 'rotate' : ''
        //     ]
        // },
        openNames(){
            return getOpenArrByName(this.$route.name,this.routers)
        }
    },

    methods: {
        ...mapActions([
            'logout',
            'handleRemove'
        ]),
        ...mapMutations([
            'UPDATE_ROUTER',
            'CLEAR_TAB'
        ]),
        handleSelect(name){
            // this.tabs.push(name)
            this.$router.push({
                name
            })
        },
        // handleCollapsed(){
        //     this.isCollapsed = !this.isCollapsed
        // },
        handleClickTab(id){
            console.log(id)
            let route = getRouteById(id)
            this.$router.push(route)
        },
        handleLogout () {
            this.logout()
            this.$router.push({
                name: 'login'
            })
            
        },
        turnTo (){
            let id = 'params' + (Math.random() * 100).toFixed(0)
            this.$router.push({
                name: 'params',
                params: {id}
            })
        },
        handleTabRemove(id,event){
            event.stopPropagation()
            console.log(id)
            this.handleRemove({
                id,
                $route: this.$route
            }).then(nextRoute=>{
                this.$router.push(nextRoute)
            })
        },
        labelRender(item){
            return  h=>{
                return (
                    <div style="width:100%;">
                        <span class="title">{item.meta.title}</span>
                        <icon  nativeOn-click={this.handleTabRemove.bind(this,getTabNameByRoute(item))} style="" type="md-close-circle"/>
                    </div>
                )
            }
        }
    }
}
</script>

<style lang="less" >
.layout-outer,.layout-wrapper{
    height: 100%;
    .header-wrapper{
        background: white;
        box-shadow: 0 1px 1px rgba(0,0,0,0.1) ;
        padding: 0 23px;
        // .icon-collapsed{
        //     cursor: pointer;
        //     vertical-align: -0.27em !important;
        //     transition: transform .3s ease;
        //     &.rotate{
        //         transform: rotateZ(-180deg);
        //         transition: transform .3s ease;
        //     }
        // }
    }
    .content-wrapper{
        padding: 10px;
        .ivu-tabs-bar{
            border: none;
            margin-bottom: 0;
            .ivu-tabs-nav-container {
                line-height: 1.56;
                font-size: 14px;
            }
            .ivu-tabs-tab-active {
                font-weight: bold;
            }
            .ivu-icon{
                margin-right: 0px;
                margin-left: 7px;
            }        
        }        
        .ivu-card{
            border-radius: 0px;
        }
    }
    
    .sider-wrapper{
        background: #e94820;
        background: #001528;
        overflow: hidden;
        height: 100%;
        .ivu-layout-sider-children {
            overflow-y: scroll;
            overflow-x: hidden;  
            margin-right: -20px;  
        }
    }
    .page-card{
        min-height: ~"calc(100vh - 120px)";
    }
}

</style>