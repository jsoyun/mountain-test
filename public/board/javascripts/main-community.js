const $select = document.getElementById('select');
const selectData = document.getElementById('select-data');
let value = 'title';    // default 값

$select.addEventListener('change', () => {
    if($select.value == 'content') {
        selectData.name = 'content';
    } else {
        selectData.name = 'user';
    };
});
