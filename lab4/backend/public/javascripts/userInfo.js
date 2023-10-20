$(document).ready(function () {
    const friendsSpan = $(this).find('#span_friends');
    const userId = friendsSpan.attr('user-id');
    const user = usersData.find(user => user.id === Number(userId));
    const friendsList = user.friends;
    const friendsNames = friendsList.map(friendId => {
        const friend = usersData.find(user => user.id === friendId);
        if (friend) {
            return friend.name + ' ' + friend.second_name;
        }
        return '';
    });
    friendsSpan.text(friendsNames.join(', '));

    $('#select_role').change(function () {
        const selectedRole = $(this).val();
        $.post(`/users/${userId}/change_role`, {role: selectedRole})
            .done((data) => {});
    });

    $('#select_status').change(function () {
        const selectedStatus = $(this).val();
        $.post(`/users/${userId}/change_status`, {status: selectedStatus})
            .done((data) => {});
    });

});