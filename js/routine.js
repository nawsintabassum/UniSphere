
let editId=null;
function render(){const q=(search.value||'').toLowerCase(),d=filter.value,a=getData('routine',[]).filter(x=>JSON.stringify(x).toLowerCase().includes(q)).filter(x=>!d||x.day===d);tableBody.innerHTML=a.length?a.map(x=>`<tr><td>${esc(x.day)}</td><td><b>${esc(x.course)}</b></td><td>${esc(x.teacher)}</td><td>${esc(x.room)}</td><td>${esc(x.start)} - ${esc(x.end)}</td><td>${rowActions(x.id,'openEdit','delItem')}</td></tr>`).join(''):`<tr><td colspan="6"><div class="empty">No classes.</div></td></tr>`}
function openEdit(id){const x=getData('routine',[]).find(v=>v.id===id);editId=id;['day','course','teacher','room','start','end'].forEach(k=>document.getElementById('f_'+k).value=x[k]??'');modalTitle.textContent='Edit Class';openModal('itemModal')}
function delItem(id){if(confirmDelete()){deleteData('routine',id);notify('Class deleted');render()}}
addBtn.onclick=()=>{editId=null;itemForm.reset();modalTitle.textContent='Add Class';openModal('itemModal')};
itemForm.onsubmit=e=>{e.preventDefault();const x={id:editId||uid(),day:f('day'),course:f('course'),teacher:f('teacher'),room:f('room'),start:f('start'),end:f('end')};editId?updateData('routine',editId,x):addData('routine',x);notify('Routine saved');closeModal('itemModal');render()};function f(k){return document.getElementById('f_'+k).value.trim()}
search.oninput=render;filter.onchange=render;document.addEventListener('DOMContentLoaded',render);
