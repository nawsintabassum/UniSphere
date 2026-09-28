
let editId=null;const gradePoints={A:4,'A-':3.7,'B+':3.5,B:3,'B-':2.7,'C+':2.3,C:2,D:1,F:0};
function calc(){let cr=0,pts=0;getData('results',[]).forEach(x=>{cr+=+x.credit||0;pts+=(+x.credit||0)*(+x.point||0)});document.getElementById('gpa').textContent=cr?(pts/cr).toFixed(2):'0.00'}
function render(){const q=(search.value||'').toLowerCase(),a=getData('results',[]).filter(x=>JSON.stringify(x).toLowerCase().includes(q));tableBody.innerHTML=a.length?a.map(x=>`<tr><td>${esc(x.code)}</td><td>${esc(x.name)}</td><td>${x.credit}</td><td>${esc(x.grade)}</td><td>${x.point}</td><td>${rowActions(x.id,'openEdit','delItem')}</td></tr>`).join(''):`<tr><td colspan="6"><div class="empty">No results.</div></td></tr>`;calc()}
function openEdit(id){const x=getData('results',[]).find(v=>v.id===id);editId=id;['code','name','credit','grade','point'].forEach(k=>document.getElementById('f_'+k).value=x[k]??'');modalTitle.textContent='Edit Result';openModal('itemModal')}
function delItem(id){if(confirmDelete()){deleteData('results',id);notify('Result deleted');render()}}
addBtn.onclick=()=>{editId=null;itemForm.reset();modalTitle.textContent='Add Result';openModal('itemModal')};
itemForm.onsubmit=e=>{e.preventDefault();let grade=f('grade'),point=Number(f('point'));if(!Number.isFinite(point))point=gradePoints[grade]??0;const x={id:editId||uid(),code:f('code'),name:f('name'),credit:Number(f('credit'))||0,grade,point};editId?updateData('results',editId,x):addData('results',x);notify('Result saved');closeModal('itemModal');render()};function f(k){return document.getElementById('f_'+k).value.trim()}
search.oninput=render;document.addEventListener('DOMContentLoaded',render);
