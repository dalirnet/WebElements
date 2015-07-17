(function($)
{

	$.InputUI = function()
	{
		var CheckCount = 0;
		$.each($('.input_ui'),function()
		{
			var This		= this;	
			var OptionOb	= {};
			var Html		= '';
			var Type		= $(this).attr('type');
			var Option		= '{"' + $(this).attr('option') + '"}';$(this).removeAttr('option').attr('autocomplete','off');	
			Option			= Option.replace(/:/g,'":"').replace(/;/g,'","').replace(/"true"/g,'true').replace(/"false"/g,'false'); 
			try
			{
				OptionOb = JSON.parse(Option);
			}
			catch(e){}
			var Option = $.extend({
				'id'			: 'small',
				'size'			: 'small',
				'background'	: false,
				'text_aling'	: false,
				'icon'			: false,
				'icon_aling'	: 'left',
				'label'			: '',
				'search_input'	: false
			},OptionOb);
			if(Type == 'text' || Type == 'password')
			{
				var ThisHtml	= $(this)[0].outerHTML;
				Html += '<div class="input_text ' + Option.size;
				Html += ((Option.background == true) ? ' bg_color' : '') + ((Option.text_aling == 'center') ? ' center' : '');
				Html += ((Option.icon != false) ? ' icon_set ' + ((Option.icon_aling == 'left') ? 'left_icon' : 'right_icon') : '') + '">';
				Html += ThisHtml + ((Option.icon != false) ? '<div class="input_icon icon ic-' + Option.icon + '"></div></div>' : '</div>');
			}
			else if(Type == 'radio' || Type == 'checkbox')
			{
				var Id = Type + '_id_' + CheckCount;
				if(typeof($(this).attr('id')) == 'undefined')
				{
					$(this).attr('id',Id);
				}
				else
				{
					Id = $(this).attr('id');
				}
				var ThisHtml	= $(this)[0].outerHTML;
				Html += ThisHtml;
				Html += '<label class="input_ui_' + Type + '" for="' + Id + '">';
				Html += ((Option.icon != false) ? '<span class="icon ic-' + Option.icon + '"></span>' : '');
				Html += '<span class="input_label">' + Option.label + '</span></label>';	
			}
			else if($(this).prop('tagName') == 'SELECT')
			{
				var Item		= [];
				var Name		= $(this).attr('name');
				var Selected	= $(this).find('option:selected');
				var FirstName	= Selected.text();
				var FirstValue	= Selected.attr('value');
				var InnerHtml	= '';
				var HideHtml	= '';
				var Count		= 0;
				$.each($(this).find('option'),function()
				{
					Item.push([$(this).attr('value'),$(this).text()]);	
				});
				Html += '<div class="input_text ' + Option.size;
				Html += ((Option.background == true) ? ' bg_color' : '') + ((Option.text_aling == 'center') ? ' center' : '');
				Html += ((Option.icon != false) ? ' icon_set ' + ((Option.icon_aling == 'left') ? 'left_icon' : 'right_icon') : '') + '">';
				if(Option.search_input == false)
				{
					Html += '<input type="text" class="input_ui input_select_name no_select" value="' + FirstName + '" autocomplete="off" readonly />';
				}
				else
				{
					Html += '<input type="text" class="input_ui input_select_name serach_input" value="' + FirstName + '" autocomplete="off" />';
				}
				Html += '<input type="hidden" class="input_select_value"  name="' + Name + '" value="' + FirstValue + '"/>';
				Html += ((Option.icon != false) ? '<div class="input_icon icon ic-' + Option.icon + '">' : '');
				Html += '</div><div class="input_select content_scroll"><ul>';
				$.each(Item,function()
				{
					HideHtml	+= ((Count == 0) ? '' : ',') + '["' + this[0] + '","' + this[1] + '"]';
					InnerHtml	+= '<li class="li_select" id="' + this[0] + '"><span class="icon ic-angle-left"></span>' + this[1] + '</li>';
					Count++;
				});
				Html += InnerHtml + '</ul></div><div class="hide_item" style="display:none;">[' + HideHtml + ']</div></div>';
			}
			$(this).replaceWith(Html);
			CheckCount++;
		});
		function SearchSelect(This,Items,Input)
		{
			var NewHtml	= '';
			$.each(Items,function()
			{
				var ThisValue = this[1];
				if(ThisValue.indexOf(Input) != -1)
				{
					NewHtml	+= '<li class="li_select" id="' + this[0] + '"><span class="icon ic-angle-left"></span>' + this[1] + '</li>';
				}	
			});
			$(This).parents('.input_text').find('.input_select ul').html(NewHtml)
		}
		$('.input_select_name.serach_input').keyup(function(e)
		{
			var Json = $(this).parents('.input_text').find('.hide_item').html();
            SearchSelect(this,JSON.parse(Json),$(this).val());
        });
		$('.input_ui').focus(function()
		{
			if($(this).hasClass('serach_input'))
			{
				$(this).select();
			}
            $(this).parent('.input_text').addClass('input_focus');
        }).blur(function()
		{
			$(this).parent('.input_text').removeClass('input_focus');

        });
		$('.input_icon').mousedown(function()
		{
			if($(this).parent('.input_text').hasClass('input_focus'))
			{
				return false;
			}	
		}).mouseup(function()
		{
			$(this).parent('.input_text').find('.input_ui').focus();
		});
		$(document).delegate('.li_select','mousedown',function()
		{
			var Parent = $(this).parents('.input_text');
			Parent.find('.input_select_name').val($(this).text());
			Parent.find('.input_select_value').val($(this).attr('id'));
			return false;
		}).delegate('.li_select','mouseup',function()
		{
			$('.input_ui').blur();
		});
		
		
	};
})(jQuery)
