import{eR as U}from"./vendor.5a0f9a12.js";class k{constructor(t,i){this.id=t,this.mbs=i,this.renderMbs=U([0,0,0,-1]),this.imModificationImpact=s.NotChecked}}var c,s,a,d,h;(function(e){e[e.Unmodified=0]="Unmodified",e[e.Culled=1]="Culled",e[e.NotChecked=2]="NotChecked"})(c||(c={})),function(e){e[e.Unmodified=0]="Unmodified",e[e.PotentiallyModified=1]="PotentiallyModified",e[e.Culled=2]="Culled",e[e.Unknown=3]="Unknown",e[e.NotChecked=4]="NotChecked"}(s||(s={}));class M extends k{constructor(t,i,n,o,r,l,u,m,f,C){super(t,n),this.index=i,this.childCount=o,this.level=r,this.resources=l,this.version=u,this.lodMetric=m,this.maxError=f,this.numFeatures=C,this.failed=!1,this.hasModifications=!1,this.cacheState=a.Unknown,this.vertexCount=0,this.memory=0}}(function(e){e[e.Unknown=0]="Unknown",e[e.Uncached=1]="Uncached",e[e.Cached=2]="Cached"})(a||(a={})),function(e){e[e.None=0]="None",e[e.MaxScreenThreshold=1]="MaxScreenThreshold",e[e.ScreenSpaceRelative=2]="ScreenSpaceRelative",e[e.RemovedFeatureDiameter=3]="RemovedFeatureDiameter",e[e.DistanceRangeFromDefaultCamera=4]="DistanceRangeFromDefaultCamera"}(d||(d={})),function(e){e[e.Hole=0]="Hole",e[e.Leaf=1]="Leaf"}(h||(h={}));class x{constructor(t,i,n,o){this.nodeHasLOD=t,this.isChosen=i,this.lodLevel=n,this.version=o}}export{h as a,M as c,x as d,c as i,s as n,a as o,d as s,k as t};